import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  propertyId: number
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        console.log('i got here with resolver data')
        this.property = data['prp'];
      }
    )

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = params['id']
    //     this.housingService.getProperty(params['id']).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // )

    this.galleryOptions = [
      {
        width: '100%',
        height: '460px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/interior-1.jpg',
        medium: 'assets/images/interior-1.jpg',
        big: 'assets/images/interior-1.jpg'
      },
      {
        small: 'assets/images/interior-2.jpg',
        medium: 'assets/images/interior-2.jpg',
        big: 'assets/images/interior-2.jpg'
      },
      {
        small: 'assets/images/interior-3.jpg',
        medium: 'assets/images/interior-3.jpg',
        big: 'assets/images/interior-3.jpg'
      },
      {
        small: 'assets/images/interior-4.jpg',
        medium: 'assets/images/interior-4.jpg',
        big: 'assets/images/interior-4.jpg'
      },
      {
        small: 'assets/images/interior-5.jpg',
        medium: 'assets/images/interior-5.jpg',
        big: 'assets/images/interior-5.jpg'
      }
    ];
  }

}
