interface RoomMatchData {
  movieId: number;
  users: string[];
  timestamp: number;
}

class RoomSwipeTracker {
  private MATCHES_KEY: string;

  constructor(roomId: string) {
    this.MATCHES_KEY = `room_${roomId}_matches`;
  }

  public trackSwipe(movieId: number, userId: string, isLiked: boolean): void {
    if (!isLiked) return; // We don't need to track dislikes

    const matches = this.getMatches() ?? [];
    const existingMatch = matches.find((m) => m.movieId === movieId);

    if (existingMatch) {
      // Add user to existing match if they haven't liked it yet
      if (!existingMatch.users.includes(userId)) {
        existingMatch.users.push(userId);
        this.saveMatches(matches);
      }
    } else {
      // Create new match entry
      matches.push({
        movieId,
        users: [userId],
        timestamp: Date.now(),
      });
      this.saveMatches(matches);
    }
  }

  public getMatchedMovies(totalUsersInRoom: number): number[] {
    const matches = this.getMatches() ?? [];
    return matches
      .filter((match) => match.users.length === totalUsersInRoom)
      .map((match) => match.movieId);
  }

  private getMatches(): RoomMatchData[] {
    try {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${this.MATCHES_KEY}=`));

      if (!cookie) return [];

      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch {
      return [];
    }
  }

  private saveMatches(matches: RoomMatchData[]): void {
    // Set cookie to expire in 24 hours
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    document.cookie = `${
      this.MATCHES_KEY
    }=${encodeURIComponent(JSON.stringify(matches))}; expires=${expiryDate.toUTCString()}; path=/`;
  }
}

export default RoomSwipeTracker;
