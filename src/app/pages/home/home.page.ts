import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    public favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(res => {
      this.pokemons = this.pokemons.concat(res.results);
      this.offset += this.limit;
      this.loading = false;
      if (event) event.target.complete();
    });
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  toggleFavorite(name: string, event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(name);
  }
}
