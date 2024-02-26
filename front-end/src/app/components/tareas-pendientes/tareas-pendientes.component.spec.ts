import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasPendientesComponent } from './tareas-pendientes.component';

describe('TareasPendientesComponent', () => {
  let component: TareasPendientesComponent;
  let fixture: ComponentFixture<TareasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
