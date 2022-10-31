import {Component, ViewChild,} from "@angular/core";
import {Movie, MovieService} from "./services/movie.service";
import {PageableService} from "../../shared/services/pageable.service";
import DataSource from "devextreme/data/data_source";
import {DxDataGridComponent} from "devextreme-angular";
import CustomStore from "devextreme/data/custom_store";
import {firstValueFrom} from "rxjs";
import {MovieEditComponent} from "./edit/movie-edit.component";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";

@Component({
  selector: 'app-movie',
  providers: [MovieService, PageableService],
  templateUrl: 'movie.component.html'
})

export class MovieComponent {

  movies: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(MovieEditComponent, {static: false}) editPopup: MovieEditComponent;

  constructor(private movieService: MovieService,
              private pageableService: PageableService) {
    this.movies = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.movieService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedMovieId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.movies.reload();
  }

  create(){
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedMovieId());
  }

  delete() {
    const result = confirm('<i>정말로 영화를 삭제하시겠습니까?</i>','영화 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.movieService.delete(this.getSelectedMovieId()).subscribe({
          next: (v) => {
            notify('영화 삭제가 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            notify('영화 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(movie: Movie) {
    this.search();
  }

}
