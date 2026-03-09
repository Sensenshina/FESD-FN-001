import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser = new User('John', 'Doe', 'john@example.com', 'password123', '1234567890', '1990-01-01');

    service.registerUser(mockUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/users/register');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get all users', () => {
    const mockUsers = [
      new User('John', 'Doe', 'john@example.com', 'password123', '1234567890', '1990-01-01')
    ];

    service.getAllUsers().subscribe((users) => {
      expect(users.length).toBe(1);
      expect(users[0].userFirstName).toBe('John');
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});