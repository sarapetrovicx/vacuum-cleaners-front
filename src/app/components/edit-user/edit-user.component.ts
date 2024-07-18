import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/service/backend.service';
import { User } from 'src/model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;

  user: User = { userId: '', firstName: '', lastName: '', email: '', password:'', permissions: ''};

  jwt: string = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: BackendService) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      create: [false],
      read: [false],
      update: [false],
      delete: [false]
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.jwt = localStorage.getItem("authToken") || "";

    console.log('User ID:', userId);
    if (userId) {
      this.userService.getUserById(userId, this.jwt).subscribe(user => {
        if (user) {
          this.user = user;
          console.log(user);
        } else {
          this.router.navigate(['all']);
        }
      });
    } else {
      this.router.navigate(['all']);
    }
  }

  onSave() {
    const updatedUser: User = {
      userId: this.user.userId,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: this.user.password,
      permissions: this.checkPermissions().join(','),
    };

    this.userService.editUser(updatedUser, this.jwt)
    .subscribe(
      (data) => {
        alert("User updated");
        this.router.navigate(['all']);
      },
      (error) => {
        if(error.error){
          alert(error.error.message);
        }
        console.error(error);
      }
    );

  }
  checkPermissions(){
    const permissionsList = [];
  
    if (this.form.get('create')?.value) {
      permissionsList.push('can_create_users');
    }
    if (this.form.get('read')?.value) {
      permissionsList.push('can_read_users');
    }
    if (this.form.get('update')?.value) {
      permissionsList.push('can_update_users');
    }
    if (this.form.get('delete')?.value) {
      permissionsList.push('can_delete_users');
    }
    return permissionsList;
  }
}
