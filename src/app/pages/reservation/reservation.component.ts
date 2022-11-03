import {Component, ViewChild} from "@angular/core";
import {MovieService} from "../movie/services/movie.service";
import {PageableService} from "../../shared/services/pageable.service";
import DataSource from "devextreme/data/data_source";
import {DxDataGridComponent} from "devextreme-angular";
import CustomStore from "devextreme/data/custom_store";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-reservation',
  providers: [MovieService, PageableService],
  templateUrl: 'reservation.component.html'
})

export class ReservationComponent {
  reservations: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  constructor(private movieService: MovieService,
              private pageableService: PageableService) {
    this.reservations = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.movieService.reserveList(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        }
      })
    });
  }

  search() {
    this.reservations.reload();
  }
}
