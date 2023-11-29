import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



import b1 from '../imagess/banner1.webp'
import b2 from '../imagess/banner2.webp'
import b3 from '../imagess/banner3.jpg'
import b4 from '../imagess/banner4.jpg'
import b5 from '../imagess/banner5.jpg'
import b6 from '../imagess/banner6.webp'
import b7 from '../imagess/banner.7.webp'
import b8 from '../imagess/banner8.webp'
import b9 from '../imagess/banner9.webp'
import d1 from '../imagess/d1.webp'
import d2 from '../imagess/d2.webp'
import d3 from '../imagess/d3.webp'
import d4 from '../imagess/d4.webp'
import d5 from '../imagess/d5.webp'
import d6 from '../imagess/d6.webp'
import d7 from '../imagess/d7.webp'
import d8 from '../imagess/d8.webp'
import a1 from '../imagess/a1.webp'
import a2 from '../imagess/a2.webp'
import a3 from '../imagess/a3.webp'
import a4 from '../imagess/a4.webp'
import a5 from '../imagess/a5.webp'
import a6 from '../imagess/a6.webp'
import a7 from '../imagess/a7.webp'
import a8 from '../imagess/a8.webp'
import a9 from '../imagess/a9.webp'
import a10 from '../imagess/a10.webp'
import a11 from '../imagess/a11.webp'
import a12 from '../imagess/a12.webp'
import a13 from '../imagess/a13.webp'
import a14 from '../imagess/a14.webp'
import a15 from '../imagess/a15.webp'
import a16 from '../imagess/a16.webp'
import c1 from '../imagess/c1.webp'
import c2 from '../imagess/c2.webp'
import c3 from '../imagess/c3.webp'
import c4 from '../imagess/c4.webp'
import c5 from '../imagess/c5.webp'
import c6 from '../imagess/c6.webp'
import c7 from '../imagess/c7.webp'
import c8 from '../imagess/c8.webp'
import c9 from '../imagess/c9.webp'
import c10 from '../imagess/c10.webp'
import c11 from '../imagess/c11.webp'
import c12 from '../imagess/c12.webp'
import c13 from '../imagess/c13.webp'
import c14 from '../imagess/c14.webp'
import c15 from '../imagess/c15.webp'
import c16 from '../imagess/c16.webp'
import c17 from '../imagess/c17.webp'
import c18 from '../imagess/c18.webp'
import c19 from '../imagess/c19.webp'
import c20 from '../imagess/c20.webp'
import c21 from '../imagess/c21.webp'
import c22 from '../imagess/c22.webp'
import c23 from '../imagess/c23.webp'
import c24 from '../imagess/c24.webp'
import bb1 from '../imagess/b1.webp'
import bb2 from '../imagess/b2.webp'
import bb3 from '../imagess/b3.webp'
import bb4 from '../imagess/b4.webp'
import bb5 from '../imagess/b5.webp'
import bb6 from '../imagess/b6.webp'
import bb7 from '../imagess/b7.webp'
import e1 from '../imagess/e1.webp'
import e2 from '../imagess/e2.webp'
import e3 from '../imagess/e3.webp'
import e4 from '../imagess/e4.webp'
import e5 from '../imagess/e5.webp'
import e6 from '../imagess/e6.webp'
import e7 from '../imagess/e7.webp'
import e8 from '../imagess/e8.webp'
import e9 from '../imagess/e9.webp'
import e10 from '../imagess/e10.webp'
import e11 from '../imagess/e11.webp'
import e12 from '../imagess/e12.webp'
import e13 from '../imagess/e13.webp'
import e14 from '../imagess/e14.webp'
import e15 from '../imagess/e15.webp'
import e16 from '../imagess/e16.webp'
import e17 from '../imagess/e17.webp'
import e18 from '../imagess/e18.webp'
import e19 from '../imagess/e19.webp'
import e20 from '../imagess/e20.webp'
import e21 from '../imagess/e21.webp'
import e22 from '../imagess/e22.webp'
import e23 from '../imagess/e23.webp'
import e24 from '../imagess/e24.webp'
import f1 from '../imagess/f1.webp'
import f2 from '../imagess/f2.webp'
import f3 from '../imagess/f3.webp'
import f4 from '../imagess/f4.webp'
import f5 from '../imagess/f5.webp'
import f6 from '../imagess/f6.webp'
import f7 from '../imagess/f7.webp'
import f8 from '../imagess/f8.webp'
import f9 from '../imagess/f9.webp'
import f10 from '../imagess/f10.webp'
import f11 from '../imagess/f11.webp'
import f12 from '../imagess/f12.webp'
import f13 from '../imagess/f13.webp'
import f14 from '../imagess/f14.webp'
import g1 from '../imagess/g1.webp'
import g2 from '../imagess/g2.webp'
import g3 from '../imagess/g3.webp'
import g4 from '../imagess/g4.webp'
import g5 from '../imagess/g5.webp'
import g6 from '../imagess/g6.webp'
import g7 from '../imagess/g7.webp'
import g8 from '../imagess/g8.webp'
import g9 from '../imagess/g9.webp'
import g10 from '../imagess/g10.webp'
import g11 from '../imagess/g11.webp'
import g12 from '../imagess/g12.webp'
import g13 from '../imagess/g13.webp'
import g14 from '../imagess/g14.webp'
import g15 from '../imagess/g15.webp'
import g16 from '../imagess/g16.webp'
import h1 from '../imagess/h1.webp'
import h2 from '../imagess/h2.webp'
import h3 from '../imagess/h3.webp'
import h4 from '../imagess/h4.webp'
import h5 from '../imagess/h5.webp'
import h6 from '../imagess/h6.webp'
import h7 from '../imagess/h7.webp'
import h8 from '../imagess/h8.webp'
import h9 from '../imagess/h9.webp'
import h10 from '../imagess/h10.webp'
import h11 from '../imagess/h11.webp'
import h12 from '../imagess/h12.webp'
import h13 from '../imagess/h13.webp'
import h14 from '../imagess/h14.webp'
import h15 from '../imagess/h15.webp'
import h16 from '../imagess/h16.webp'
import i1 from '../imagess/i1.webp'
import i2 from '../imagess/i2.webp'
import i3 from '../imagess/i3.webp'
import i4 from '../imagess/i4.webp'
import i5 from '../imagess/i5.webp'
import j1 from '../imagess/j1.webp'
import j2 from '../imagess/j2.webp'
import j3 from '../imagess/j3.webp'
import j4 from '../imagess/j4.webp'
import k1 from '../imagess/k1.webp'
import k2 from '../imagess/k2.webp'
import k3 from '../imagess/k3.webp'
import k4 from '../imagess/k4.webp'
import k5 from '../imagess/k5.webp'
import k6 from '../imagess/k6.webp'
import k7 from '../imagess/k7.webp'
import k8 from '../imagess/k8.jpg'
import k9 from '../imagess/k9.webp'
import k10 from '../imagess/k10.webp'
import k11 from '../imagess/k11.webp'
import k12 from '../imagess/k12.jpg'
import k13 from '../imagess/k13.webp'
import k14 from '../imagess/k14.jpg'
import k15 from '../imagess/k15.webp'
import k16 from '../imagess/k16.webp'
import l1 from '../imagess/l1.jpg'
import l2 from '../imagess/l2.jpg'
import l3 from '../imagess/l3.jpg'
import l4 from '../imagess/l4.jpg'
import l5 from '../imagess/l5.jpg'
import l6 from '../imagess/l6.jpg'
import l7 from '../imagess/l7.jpg'
import m1 from '../imagess/m1.webp'
import m2 from '../imagess/m2.webp'
import m3 from '../imagess/m3.webp'
import m4 from '../imagess/m4.webp'
import m5 from '../imagess/m5.webp'
import m6 from '../imagess/m6.webp'
import m7 from '../imagess/m7.webp'
import m8 from '../imagess/m8.webp'
import n1 from '../imagess/n1.webp'
import n2 from '../imagess/n2.webp'
import n3 from '../imagess/n3.jpg'
import n4 from '../imagess/n4.webp'
import n5 from '../imagess/n5.webp'
import n6 from '../imagess/n6.webp'
import n7 from '../imagess/n7.webp'
import n8 from '../imagess/n8.webp'
import o1 from '../imagess/o1.webp'
import o2 from '../imagess/o2.webp'
import o3 from '../imagess/o3.webp'
import o4 from '../imagess/o4.webp'
import o5 from '../imagess/o5.webp'
import o6 from '../imagess/o6.webp'
import o7 from '../imagess/o7.jpg'
import p1 from '../imagess/p1.webp'
import p2 from '../imagess/p2.webp'
import p3 from '../imagess/p3.webp'
import p4 from '../imagess/p4.webp'
import p5 from '../imagess/p5.webp'
import p6 from '../imagess/p6.webp'
import p7 from '../imagess/p7.webp'
import p8 from '../imagess/p8.webp'
import q1 from '../imagess/q1.webp'
import q2 from '../imagess/q2.webp'
import q3 from '../imagess/q3.webp'
import q4 from '../imagess/q4.webp'
import q5 from '../imagess/q5.webp'
import q6 from '../imagess/q6.webp'
import q7 from '../imagess/q7.webp'
import q8 from '../imagess/q8.webp'
import r1 from '../imagess/r1.webp'
import r2 from '../imagess/r2.webp'
import r3 from '../imagess/r3.webp'
import r4 from '../imagess/r4.webp'
import r5 from '../imagess/r5.webp'
import r6 from '../imagess/r6.webp'
import r7 from '../imagess/r7.webp'
import r8 from '../imagess/r8.webp'
import s1 from '../imagess/s1.webp'
import s2 from '../imagess/s2.webp'
import s3 from '../imagess/s3.webp'
import s4 from '../imagess/s4.webp'
import s5 from '../imagess/s5.webp'
import s6 from '../imagess/s6.webp'
import s7 from '../imagess/s7.webp'
import s8 from '../imagess/s8.webp'
import t1 from '../imagess/t1.webp'
import t2 from '../imagess/t2.webp'
import t3 from '../imagess/t3.webp'
import t4 from '../imagess/t4.webp'
import t5 from '../imagess/t5.webp'
import t6 from '../imagess/t6.webp'
import t7 from '../imagess/t7.webp'
import t8 from '../imagess/t8.webp'
import u1 from '../imagess/u1.webp'
import u2 from '../imagess/u2.webp'
import u3 from '../imagess/u3.webp'
import u4 from '../imagess/u4.jpg'
import u5 from '../imagess/u5.webp'
import u6 from '../imagess/u6.webp'
import u7 from '../imagess/u7.webp'
import u8 from '../imagess/u8.webp'
import mb1 from '../imagess/mb1.jpg'
import mb2 from '../imagess/mb2.jpg'
import mb3 from '../imagess/mb3.jpg'
import ma1 from '../imagess/ma1.webp'
import ma2 from '../imagess/ma2.webp'
import ma3 from '../imagess/ma3.webp'
import ma4 from '../imagess/ma4.webp'
import ma5 from '../imagess/ma5.webp'
import ma6 from '../imagess/ma6.webp'
import ma7 from '../imagess/ma7.webp'
import ma8 from '../imagess/ma8.webp'
import ma9 from '../imagess/ma9.webp'
import ma10 from '../imagess/ma10.webp'
import ma11 from '../imagess/ma11.webp'
import mm3 from '../imagess/mm3.jpg'
import mad1 from '../imagess/mad1.jpg'
import mm1_1 from '../imagess/mm1-1.gif'
import mm1_2 from '../imagess/mm1-2.gif'
import mm2_1 from '../imagess/mm2-1.gif'
import mm2_2 from '../imagess/mm2-2.gif'
import mc1 from '../imagess/mc1.webp'
import mc2 from '../imagess/mc2.webp'
import mc3 from '../imagess/mc3.webp'
import mc4 from '../imagess/mc4.jpg'
import mc5 from '../imagess/mc5.webp'
import mc6 from '../imagess/mc6.webp'
import mc7 from '../imagess/mc7.webp'
import mc8 from '../imagess/mc8.webp'
import HomePart from './HomePart'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import { Box, Image } from '@chakra-ui/react'
import MobNav2 from '../NavBar/MobNav2'
import MobileNav from '../NavBar/MobileNav'
import axios from 'axios';
import { baseUrl } from '../../Url';
import { useEffect } from 'react';

const Home = () => {
  const [hamburger, setHamburger] = useState(false)
  const [banners, setBanners] = useState();
  const [dealOfTheDays, setDealOfTheDays] = useState();
  const [flashSales, setFlashSales] = useState();
  const fetchData = () => {
    axios.get(`${baseUrl}/banners`)
      .then((doc) => {
        setBanners(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [])

  const fetchDealOfTheDays = () => {
    axios.get(`${baseUrl}/products?isDealOfTheDay=true`)
    .then((doc) => {
      setDealOfTheDays(doc.data)
    })
    .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchDealOfTheDays()
  }, [])

  const fetchFlashSales = () => {
    axios.get(`${baseUrl}/products?isFlashSale=true`)
    .then((doc) => {
      setFlashSales(doc.data)
    })
    .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchFlashSales();
  }, [])

  return (<Box mt={"0px"}>

    {hamburger ? <MobileNav setHamburger={setHamburger} hamburger={hamburger} /> : <Box >
      <Box>
        <Nav setHamburger={setHamburger} hamburger={hamburger} />
        <Carousel autoPlay interval={"2000"} infiniteLoop>
          {/* {
            banners?.length && <>
              {banners.map((banner) => (
                <Image src={banner.image} alt="banner img" w={"100%"} />
              ))}
            </>
          } */}
          <Image src={b1} alt="" w={"100%"} />
          <Image src={b2} alt="" w={"100%"} />
          <Image src={b3} alt="" w={"100%"} />
          <Image src={b4} alt="" w={"100%"} />
          <Image src={b5} alt="" w={"100%"} />
          <Image src={b6} alt="" w={"100%"} />
          <Image src={b7} alt="" w={"100%"} />
          <Image src={b8} alt="" w={"100%"} />
        </Carousel>
        {/* <HomePart data={[d1, d2, d3, d4, d5, d6, d7, d8]} text="DEAL OF THE DAY" length={8} /> */}
        <HomePart data={dealOfTheDays} text="DEAL OF THE DAY" length={8} />
        <HomePart data={[a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16]} text="BEST OF MYNTRA EXCLUSIVE BRANDS" length={8} />
        <HomePart data={[bb1, bb2, bb3, bb4, bb5, bb6, bb7]} text="TOP PICKS" length={7} />
        <HomePart data={[c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24]} text="CATEGORIES TO BAG" length={8} />
        <HomePart data={[e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21, e22, e23, e24]} text="DEALS ON TOP BRANDS" length={8} />
        <HomePart data={[f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14]} text="BRANDS AT SLASHED PRICES" length={7} />
        <HomePart data={[g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16]} text="BEST BUYS" length={8} />
        <HomePart data={[h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16]} text="MYNTRA LUXE" length={8} />
        <HomePart data={[i1, i2, i3, i4]} text="GIFTING CARDS" length={4} />
        <HomePart data={[j1, j2, j3, j4]} text="DEALS ON LATEST ARRIVALS" length={2} />
        <HomePart data={[k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14, k15, k16]} text="SPRING SUMMER 2022- FIRST ON MYNTRA" length={8} />
        <Footer />
      </Box>

    </Box>}


  </Box>
  )
}

export default Home
