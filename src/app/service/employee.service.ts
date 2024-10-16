import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesCollection = collection(this.firestore, 'employees'); // Firestore collection reference

  constructor(private firestore: Firestore) {}

  // Get all employees from Firestore
  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, {
      idField: 'id',
    }) as Observable<Employee[]>;
  }

  // Add a new employee to Firestore
  addEmployee(employee: Employee): Promise<void> {
    delete employee.id; // Ensure Firestore generates an ID
    return addDoc(this.employeesCollection, { ...employee })
      .then(() => {})
      .catch((error) => {
        console.error('Error while adding employee to Firestore:', error);
        throw error;
      });
  }
}
