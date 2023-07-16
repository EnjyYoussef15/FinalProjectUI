import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../Services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../Models/meeting';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit{

  constructor(private meetingServices:MeetingService,private route:ActivatedRoute){}
  ngOnInit(): void {
this.getID();
  }
  meetingId:string='';
  meeting:Meeting={
    buyerID:'',
    date:new Date,
    meeingDate:new Date,
    meetingDetails:'',
    offerID:0,
    ownerID:'',
    stuts:false,
    unitID:0
  };


  getID(){
    this.route.paramMap.subscribe((params) => {

      this.meetingId = params.get('id')!;
      console.log("===== id ===",this.meetingId);

      this.meetingServices.getMettingDeails(this.meetingId).subscribe({
        next:(value)=>{
        console.log("Value From Meeting",value);
        console.log("PayloadMeeting",value.payload.data());
        //  payload.doc.data()
        }


      });
    });
  }
}
