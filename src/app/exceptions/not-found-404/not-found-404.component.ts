import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-not-found-404',
  templateUrl: './not-found-404.component.html',
  styleUrls: ['./not-found-404.component.css']
})
export class NotFound404Component implements OnInit {
  pageX!: number;
  pageY!: number;
  mouseY: number = 0;
  mouseX: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.pageX = window.innerWidth;
    this.pageY = window.innerHeight;

    this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
      // Vertical axis
      this.mouseY = event.pageY;
      const yAxis = (this.pageY / 2 - this.mouseY) / this.pageY * 300;

      // Horizontal axis
      this.mouseX = event.pageX / -this.pageX;
      const xAxis = -this.mouseX * 100 - 100;

      // Using Renderer2 to safely manipulate DOM
      const eyes = document.querySelector('.box__ghost-eyes');
      if (eyes) {
        this.renderer.setStyle(eyes, 'transform', `translate(${xAxis}%, -${yAxis}%)`);
      }
    });
  }
}
