import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  constructor() {}

  getFavorites(): string[] {
    const fav = localStorage.getItem(this.storageKey);
    return fav ? JSON.parse(fav) : [];
  }

  isFavorite(name: string): boolean {
    return this.getFavorites().includes(name);
  }

  addFavorite(name: string): void {
    const fav = this.getFavorites();
    if (!fav.includes(name)) {
      fav.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(fav));
    }
  }

  removeFavorite(name: string): void {
    let fav = this.getFavorites();
    fav = fav.filter(f => f !== name);
    localStorage.setItem(this.storageKey, JSON.stringify(fav));
  }

  toggleFavorite(name: string): void {
    if (this.isFavorite(name)) {
      this.removeFavorite(name);
    } else {
      this.addFavorite(name);
    }
  }
}
