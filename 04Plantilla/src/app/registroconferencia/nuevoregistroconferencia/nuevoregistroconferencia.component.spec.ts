import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoregistroconferenciaComponent } from './nuevoregistroconferencia.component';

describe('NuevoregistroconferenciaComponent', () => {
  let component: NuevoregistroconferenciaComponent;
  let fixture: ComponentFixture<NuevoregistroconferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoregistroconferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoregistroconferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
