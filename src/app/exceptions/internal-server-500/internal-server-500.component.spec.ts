import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServer500Component } from './internal-server-500.component';

describe('InternalServer500Component', () => {
  let component: InternalServer500Component;
  let fixture: ComponentFixture<InternalServer500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalServer500Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalServer500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
