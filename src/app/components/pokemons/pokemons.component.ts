import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { Pokemon, PokelectionService } from '../../../api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  displayedColumns = ['image', 'name', 'nickname', 'level', 'caught', 'delete'];
  dataSource: MatTableDataSource<Pokemon>;
  pokemonService: PokelectionService;
  id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, pokemonService: PokelectionService, public dialog: MatDialog) {
    this.pokemonService= pokemonService;
   
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   ngOnInit() {
     var param;
    this.route.params.subscribe(params => {
      param = params['id']; 
      this.id = param;
    });

    this.pokemonService.getUserPokemons(param).subscribe(pokemons =>{
      pokemons.forEach(pokemon => {
        if(!pokemon.nickname){
          pokemon.nickname = pokemon.name;
        }
      });
      this.dataSource = new MatTableDataSource(pokemons);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
  }

  delete(id: string){
    this.pokemonService.deleteUserPokemon(this.id, id);
  }

  saveNickname(nickname: string, pokemonId: string){
    this.pokemonService.getUserPokemon(this.id, pokemonId).subscribe(pokemon=>{
      pokemon.nickname = nickname;
      this.pokemonService.editUserPokemon(this.id, pokemonId, pokemon);
    })
  }

  saveLevel(level: number, pokemonId: string){
    this.pokemonService.getUserPokemon(this.id, pokemonId).subscribe(pokemon=>{
      pokemon.lvl = level;
      this.pokemonService.editUserPokemon(this.id, pokemonId, pokemon);
    })
  }

  saveCaught(caught: boolean, pokemonId: string){
    this.pokemonService.getUserPokemon(this.id, pokemonId).subscribe(pokemon=>{
      pokemon.caught = caught;
      this.pokemonService.editUserPokemon(this.id, pokemonId, pokemon);
    })
  }

}

