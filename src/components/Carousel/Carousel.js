import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "./style.css";

const items = [
  {
    src: 'https://pbs.twimg.com/media/EDhSh3aUwAEB5iS.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: 'http://thuviendanang.vn/uploads/cai-ket-cuoi-cung-cua-truyen-tranh-doraemon.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'https://external-preview.redd.it/h0Qk9G-IVdom8aebI_Reu9gsrA19luHfGRauo9UyL-0.jpg?auto=webp&s=675a1b1788154dd36f96840e2d64f5415f8d74d7',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;