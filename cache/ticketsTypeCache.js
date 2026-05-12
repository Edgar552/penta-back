let cache = null;
let expiresAt = 0;

const TTL = 1000 * 60 * 10;

export function getTicketsTypeCache() {
    if (cache && Date.now() < expiresAt) return cache;
    return null;
}

export function setTicketsTypeCache(data) {
    cache = data;
    expiresAt = Date.now() + TTL;
}

export function clearTicketsTypeCache() {
    cache = null;
    expiresAt = 0;
}
