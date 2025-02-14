interface SwipeData {
  liked: number[];
  disliked: number[];
}

export const initializeStorage = () => {
  if (typeof window === 'undefined') return null;

  return new SwipeTracker();
};

class SwipeTracker {
  private COOKIE_KEY: string;

  constructor() {
    this.COOKIE_KEY = 'movieSwipes';
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!this.getSwipeData()) {
      this.saveSwipeData({
        liked: [],
        disliked: [],
      });
    }
  }

  private getSwipeData(): SwipeData | null {
    try {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${this.COOKIE_KEY}=`));

      if (!cookie) return null;

      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch {
      return null;
    }
  }

  private saveSwipeData(data: SwipeData): void {
    // Set cookie to expire in 30 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    document.cookie = `${this.COOKIE_KEY}=${encodeURIComponent(JSON.stringify(data))}; expires=${expiryDate.toUTCString()}; path=/`;
  }

  public trackSwipe(movieId: number, isLiked: boolean): void {
    const data = this.getSwipeData() || { liked: [], disliked: [] };
    const category = isLiked ? 'liked' : 'disliked';

    if (!data[category].includes(movieId)) {
      data[category].push(movieId);
      this.saveSwipeData(data);
    }
  }

  public hasBeenSwiped(movieId: number): boolean {
    const data = this.getSwipeData();
    if (!data) return false;
    return data.liked.includes(movieId) || data.disliked.includes(movieId);
  }

  public getLikedMovies(): number[] {
    return this.getSwipeData()?.liked || [];
  }

  public getDislikedMovies(): number[] {
    return this.getSwipeData()?.disliked || [];
  }

  public getAllSwipedMovies(): number[] {
    const data = this.getSwipeData();
    if (!data) return [];
    return [...data.liked, ...data.disliked];
  }

  public clearSwipeHistory(): void {
    document.cookie = `${this.COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    this.initializeStorage();
  }
}

export default SwipeTracker;
