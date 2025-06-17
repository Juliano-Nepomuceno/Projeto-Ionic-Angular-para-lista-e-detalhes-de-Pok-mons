import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  descriptions: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonByName(name).subscribe(data => {
        this.pokemon = data;

        this.descriptions = [
          `Height: ${data.height}`,
          `Weight: ${data.weight}`,
          `Base Experience: ${data.base_experience}`,
          `Abilities: ${data.abilities.map((a: any) => a.ability.name).join(', ')}`,
          `Types: ${data.types.map((t: any) => t.type.name).join(', ')}`,
          `Moves count: ${data.moves.length}`
        ];
      });
    }
  }
}
