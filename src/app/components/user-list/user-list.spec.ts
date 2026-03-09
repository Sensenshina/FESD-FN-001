import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockUsers = [
      new User('John', 'Doe', 'john@example.com', 'password123', '1234567890', '1990-01-01')
    ];
    
    spyOn(userService, 'getAllUsers').and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(component.users.length).toBe(1);
  });
});