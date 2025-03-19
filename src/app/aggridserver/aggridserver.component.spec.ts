import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridserverComponent } from './aggridserver.component';

describe('AggridserverComponent', () => {
  let component: AggridserverComponent;
  let fixture: ComponentFixture<AggridserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggridserverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
