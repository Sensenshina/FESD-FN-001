import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  viewMode: 'table' | 'card' = 'table';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  getUserAge(user: User): number | string {
    try {
      return user.getAge();
    } catch (error: any) {
      return 'N/A';
    }
  }

  toggleViewMode(mode: 'table' | 'card'): void {
    this.viewMode = mode;
  }

  deleteUser(userId: string | undefined): void {
    if (!userId) return;

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          alert('Failed to delete user: ' + error.message);
        }
      });
    }
  }
}