import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroconferenciaComponent } from './registroconferencia.component';

describe('RegistroconferenciaComponent', () => {
  let component: RegistroconferenciaComponent;
  let fixture: ComponentFixture<RegistroconferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroconferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroconferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
