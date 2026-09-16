'use client';

import 'swiper/css';
import 'swiper/css/autoplay';

import Image from 'next/image';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BANNERS_URL } from '@/shared/config';

import styles from './BannersCarousel.module.scss';
import { type BannersCarouselProps } from './BannersCarousel.types';

export const BannersCarousel = ({ banners }: BannersCarouselProps) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <Swiper
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.container}
        autoHeight
        speed={500}
        modules={[Autoplay]}
      >
        {banners.map((banner) =>
          banner.image_path ? (
            <SwiperSlide key={banner.id}>
              {}
              <a href={banner.link} target="_blank" rel="noreferrer">
                <Image
                  width={840}
                  height={345}
                  src={BANNERS_URL + banner.image_path}
                  alt="banner"
                  className={styles.banner}
                />
              </a>
            </SwiperSlide>
          ) : null,
        )}
      </Swiper>
    </div>
  </div>
);
