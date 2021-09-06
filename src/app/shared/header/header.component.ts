import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollTo(e){
    console.log(e)
    if(e.target.innerText === 'PROJECTS'){
      let target = (document.querySelector('#section-project'));
      let cords = target.getBoundingClientRect();
      window.scrollTo({
        behavior:'smooth',
        top:window.pageYOffset+cords.top,
        left:window.pageXOffset+cords.left
      });
    }
  }

}
