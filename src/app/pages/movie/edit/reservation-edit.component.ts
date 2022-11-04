import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import 'devextreme/data/odata/store'
import {Movie, MovieService, Reservation} from "../services/movie.service";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";
@Component({
  selector: 'app-reservation-edit-popup',
  providers: [MovieService],
  templateUrl: 'reservation-edit.component.html'
})

export class ReservationEditComponent {
  reservation: Reservation;
  movie: Movie;
  popupVisible = false;
  theaters = [{code: 'CGV', text: 'CGV'},{code: 'MEGA BOX', text: 'MEGA BOX'},{code: 'LOTTE CINEMA', text: 'LOTTE CINEMA'}];
  seats = [{code: 'a1', text: 'a1'},{code: 'a2', text: 'a2'},{code: 'a3', text: 'a3'}]
  times = [{code: '10:00', text: '10:00'},{code: '13:00', text: '13:00'},{code: '16:00', text: '16:00'}]


  @Output() onSaved = new EventEmitter<Reservation>();
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;
  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private movieService: MovieService) {
  }

  open(movieId?: number){

    this.movieService.find(movieId).subscribe({
      next: (v) => {
        this.movie = v;
        console.log(this.movie);
        this.reservation = {} as Reservation;
        this.popupVisible = true;
      },
      error: (e) => {
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 2000);
      }
    });
  }

  save = (e) => {
    const result = this.validationGroup.instance.validate();
    if (!result.isValid) {
      return;
    }
    this.reservation.movie = this.movie;
    this.movieService.reserve(this.reservation).subscribe({
      next: (v) => {
        notify('영화 예매가 완료되었습니다.','success', 2000);
        this.onSaved.emit(v);
        this.popupVisible = false;
      },
      error: (e) => {
        notify('영화 예매 실패','error', 2000);
      }
    })
  }

  cancel = () => {
    this.popupVisible = false;
  }



}


