export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} --- ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}
