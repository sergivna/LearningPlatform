import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/shared/services/http/courses.service';
import { CourseDetails } from './../../shared/models/courseDetails';
import Hls from 'hls.js';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent{
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) { } 
  
  @ViewChild('video', { static: true })
  private readonly video!: ElementRef<HTMLVideoElement>;
  
  course: CourseDetails | undefined;
  playing: boolean = false;
  icon: string = "play_arrow";
  
  currentVideo!: string;
  public currentProgress = 0;
  public duration = 0;
  
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.coursesService.getCourseById(params["courseId"])
          .subscribe(data => {
            this.course = data;
            this.playVideo(0);
          });  
      }
    );

    this.video.nativeElement.addEventListener("timeupdate", () => {
      this.currentProgress = this.video.nativeElement.currentTime;
      this.duration = this.video.nativeElement.duration;
    });
  }

  playVideo(lessonIndex: number) {
    if (this.currentVideo) {
      localStorage.setItem(this.currentVideo, this.currentProgress.toString());
    }

    if (this.course!.lessons[lessonIndex].status == "locked") {
      alert("The lesson is locked!");
      return;
    }

    this.pause();
    this.duration = 0;
    this.currentProgress = 0;
    this.currentVideo = this.course!.lessons[lessonIndex].id;

    let startTime!: number;
    if (localStorage.getItem(this.course!.lessons[lessonIndex].id)) {
      startTime = JSON.parse(localStorage.getItem(this.course!.lessons[lessonIndex].id) || '');
    } else {
      startTime = 0;
    }

    const params = {
      startPosition: startTime,          
    }

    if (Hls.isSupported()) {
      let hls = new Hls(params);
      hls.loadSource(this.course!.lessons[lessonIndex].link);
      hls.attachMedia(this.video.nativeElement);
    } 

    this.play();
  }

  get durationMinutes() {
    return this.duration / 60;
  }

  get durationSeconds() {
    return this.duration - (Math.floor(this.durationMinutes) * 60);
  }

  get currentMinutes() {
    return this.currentProgress / 60;
  }

  get currentSeconds() {
    return this.currentProgress - (Math.floor(this.currentMinutes) * 60);
  }

  onVideoClick() {
    this.playing = !this.playing;
    if (this.playing) {
      this.play();
    } else {
      this.pause();
    }
  }  

  pause() {
    this.icon = "play_arrow";
    this.video.nativeElement.pause();
  }

  play() {
    this.icon = "pause";
    this.video.nativeElement.play();
  }

  padZeros(value = 0, padding = 2) {
    return `${Math.floor(value)}`.padStart(padding, '0');
  }
}
