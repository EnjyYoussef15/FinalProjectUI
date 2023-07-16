import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meeting } from '../Models/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private afs:AngularFirestore) { }

  addMeeting(meeting:Meeting){
    console.log("Begin Services === ",meeting);

    this.afs.collection('/user').doc(meeting.ownerID).collection('Meeting').add(meeting);
    this.afs.collection('/user').doc(meeting.buyerID).collection('Meeting').add(meeting);
  }

  getAllMettings(){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Meeting').snapshotChanges();
  }

  getMettingDeails(meetinID:string){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Meeting').doc(meetinID).snapshotChanges();
  }
}
