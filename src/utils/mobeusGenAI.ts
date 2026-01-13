const API_BASE = 'https://gen.mobeus.ai';

export type GenAIMediaType = 'image' | 'video';

export interface GenAIOptions {
    size?: string;
    model?: string;
    duration?: string;
}

export async function generateMedia({ type, prompt, options }: { type: GenAIMediaType, prompt: string, options?: GenAIOptions }): Promise<string> {
    let endpoint = '';
    const body: any = { prompt };

    // 1. Construct Request
    if (type === 'image') {
        // Using Google Imagen 3 via gen.mobeus.ai
        endpoint = '/generate/image/google';
        // options: { size: "1024x1024" }
        if (options) Object.assign(body, options);
    } else if (type === 'video') {
        // Using Google Veo 2 via gen.mobeus.ai
        endpoint = '/generate/video/google';
        // Default options for video
        body.model = options?.model || 'veo-2';
        body.duration = options?.duration || '4s';
        body.size = options?.size || '1280x720';
    }

    // 2. Submit Job
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    // Check if endpoint exists
    if (response.status === 404) {
        if (type === 'video') {
            throw new Error('Video generation is not yet available on this server. The /generate/video/google endpoint has not been deployed.');
        }
        throw new Error(`Endpoint not found: ${endpoint}`);
    }

    const data = await response.json();

    if (!data.jobId) {
        throw new Error(data.error || 'Failed to start job');
    }

    // 3. Poll for Completion
    return pollJob(data.jobId);
}

function pollJob(jobId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${API_BASE}/generate/jobs/${jobId}`);

                // Handle Server Restart
                if (res.status === 404) {
                    clearInterval(interval);
                    reject(new Error('Job not found (Server may have restarted)'));
                    return;
                }

                const job = await res.json();

                if (job.status === 'completed') {
                    clearInterval(interval);
                    // API returns full URL like: https://gen.mobeus.ai/files/filename.mp4
                    resolve(job.result.url);
                } else if (job.status === 'failed') {
                    clearInterval(interval);
                    reject(new Error(job.error));
                }
                // Else: still 'queued' or 'processing', waiting...
            } catch (err) {
                clearInterval(interval);
                reject(err);
            }
        }, 2000); // Poll every 2 seconds
    });
}
