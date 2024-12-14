export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`http://localhost:5555/api/${url}`, {
      ...options,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
    });

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data?.message || `Error: ${response.status} --- ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}
