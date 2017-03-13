/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import styles from './styles.css';

import { loading, loadingDone } from 'containers/App/actions';

import SpaciousMp from './Spacious.mp4';
import SpaciousWebm from './Spacious.webm';
import SpaciousJPG from './Spacious.jpg';

import Logo from 'components/Logo';
import Button from 'components/Button';
import Footer from 'components/Footer';

import BlibliImg from './blibli.png';
import CermatiImg from './cermati.png';
import DekorumaImg from './dekoruma.png';
import DmsumImg from './dmsum.png';
import HappyfreshImg from './happyfresh.png';
import IndivaraImg from './indivara.png';
import QlapaImg from './qlapa.png';
import TokopediaImg from './tokopedia.png';
import MidtransImg from './midtrans.png';
import KudoImg from './kudo.png';
import XenditImg from './xendit.png';
import SircloImg from './sirclo.png';

import ArunaHarsa from './aru.png';
import Frans from './frans.png';
import RakhaKanz from './rakha.png';
import VictorArdianto from './victor.png';

import CheckedImg from './checked.png';
import SearchImg from './search.png';
import TeamImg from './team.png';
import WorkImg from './worker.png';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      testimony: 0,
      testimonyList: [
        {
          testimonyText: '"We used Quint to source top-notch quality of engineering internship, and the result was awesome. We were able to match with interns that are not only were great culture fit, but also built several core products, making huge impact towards our business. Their quality are definitely beyond any other platforms we\'ve used before."',
          testimonyName: 'Aruna Harsa',
          testimonyPosition: 'Co-Founder, CTO of Dekoruma',
          testimonyPicture: ArunaHarsa,
        },
        {
          testimonyText: '"Proses yang sangat cepat - hanya butuh 4 hari untuk saya dari submit resume sampai diterima di perusahaan yang saya inginkan. Tanpa Quint, saya rasa saya tidak akan melakukan internship di liburan kali ini. Terima kasih."',
          testimonyName: 'Rakha Kanz Kautsar',
          testimonyPosition: 'Software Engineering Intern of Dekoruma',
          testimonyPicture: RakhaKanz,
        },
        {
          testimonyText: '"We worked with Quint for our internship program, Quint brought in great talent with national and international achievements."',
          testimonyName: 'Fransiskus Xaverius',
          testimonyPosition: 'Co-Founder, CEO of Xendit',
          testimonyPicture: Frans,
        },
        {
          testimonyText: '"Saya pernah menggunakan aplikasi internship match-making lain, namun karena alurnya tidak mudah, saya tidak lanjut menggunakan. Kemudian salah seorang teman saya merekomendasikan Quint. Setelah saya coba ternyata Quint lebih mudah dipakai, dan dalam waktu yang singkat saya langsung mendapatkan tempat internship yang saya inginkan."',
          testimonyName: 'Victor Ardianto',
          testimonyPosition: 'Quality Engineering Intern of HappyFresh',
          testimonyPicture: VictorArdianto,
        },
      ],
    };
  }

  componentWillMount() {
    this.props.loading();
  }

  componentDidMount() {
    this.props.loadingDone();
  }

  componentWillUnmount() {
    this.props.loading();
  }

  setPage(targetPage) {
    this.setState({ testimony: targetPage });
  }

  render() {
    return (
      <div>
        <div className="row expanded">
          <div className="small-12 columns">
            <div className="show-for-large">
              <div className={styles.hero}>
                <div className={styles.container}>
                  <div className={styles.heroBackground}>
                    <div className={styles.filter} />
                    <video autoPlay loop className={styles.video}>
                      <source src={SpaciousMp} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                      <source src={SpaciousWebm} type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
                    </video>
                  </div>
                  <div className={styles.heroContent}>
                    <div className={styles.container}>
                      <Logo className={styles.logo} />
                      <h1 className={styles.tagline}>Quality Internship for Talented Students,<br />Top Universities, and Qualified Companies.</h1>
                      <h1 className={styles.principle}>Quint adalah <i>internship match making platform</i> yang menjadi solusi bagi mahasiswa, universitas, dan perusahaan.</h1>
                      <Button className={styles.blackButton} handleRoute={() => this.props.push('/mahasiswa/login')} >coba sekarang</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hide-for-large">
              <div className={styles.hero}>
                <div className={styles.container}>
                  <div className={styles.heroBackground}>
                    <div className={styles.filter} />
                    <img className={styles.coverImg} alt="cover" src={SpaciousJPG} />
                  </div>
                  <div className={styles.heroContent}>
                    <div className={styles.container}>
                      <Logo className={styles.logo} />
                      <h1 className={styles.tagline}>Quality Internship for Talented Students,<br />Top Universities, and Qualified Companies.</h1>
                      <h1 className={styles.principle}>Quint adalah <i>internship match making platform</i> yang menjadi solusi bagi mahasiswa, universitas, dan perusahaan.</h1>
                      <Button className={styles.blackButton} handleRoute={() => this.props.push('/mahasiswa/login')} >coba sekarang</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="small-12 columns">
            <div className={styles.content}>
              <div className={styles.secondPanel}>
                <div className="row expanded">
                  <div className="small-12 columns">
                    <h1>Keunggulan Kami</h1>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Mahasiswa</h2>
                      <img src={SearchImg} alt="searchIcon" />
                      <h3>Cari Internship Lebih Mudah</h3>
                      <h4>Tidak perlu lagi membuka puluhan website dan bertanya ke kerabat dekat untuk mencari tahu lowongan internship. Quint mengumpulkan lowongan internship dari perusahaan terbaik dan berkualitas di Indonesia.</h4>
                    </div>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Mahasiswa</h2>
                      <img src={CheckedImg} alt="searchIcon" />
                      <h3>Ketahui Status Seleksi Anda</h3>
                      <h4>Penasaran mengetahui progess lamaran internship anda di perusahaan? Dengan Quint, anda akan terus mendapatkan update untuk mengetahui status seleksi anda.</h4>
                    </div>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Mahasiswa</h2>
                      <img src={WorkImg} alt="searchIcon" />
                      <h3>Siap Hadapi Tes dan Wawancara</h3>
                      <h4>Bingung mempersiapkan apa yang perlu dipelajari untuk tes/wawancara? Quint menyediakan materi dan sumber terbaik dalam satu tempat untuk persiapan terbaik anda.</h4>
                    </div>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Perusahaan</h2>
                      <img src={TeamImg} alt="searchIcon" />
                      <h3>Dapatkan Mahasiswa Bertalenta</h3>
                      <h4>Quint merupakan tempat berkumpulnya mahasiswa bertalenta yang siap magang di perusahaan terbaik. Temukan mahasiswa berkualitas di Universitas Indonesia sesuai kriteria perusahaan anda.</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.thirdPanel}>
                <div className={styles.contentContainer}>
                  <div className="row expanded">
                    <div className="small-12 columns text-center">
                      <h3>Perusahaan yang Mempercayai Quint</h3>
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={BlibliImg} alt="Blibli.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={TokopediaImg} alt="Tokopedia.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={MidtransImg} alt="midtrans.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={DekorumaImg} alt="dekoruma.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={CermatiImg} alt="cermati.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={HappyfreshImg} alt="yesboss.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={QlapaImg} alt="ruma.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={IndivaraImg} alt="indivara.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={DmsumImg} alt="dmsum.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center end">
                      <img src={XenditImg} alt="xendit.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center end">
                      <img src={KudoImg} alt="kudo.co.id" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center end">
                      <img src={SircloImg} alt="sirclo.com" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.fourthPanel}>
                <div className={styles.testimonyContentContainer}>
                  <div className="row expanded">
                    <div className="small-12 columns text-center">
                      <h3>Testimoni</h3>
                    </div>
                    <div className="small-12 columns">
                      <div className={styles.testimonyDivider} />
                    </div>
                    <div className="small-12 columns text-center">
                      <p className={styles.testimonyText}>{this.state.testimonyList[this.state.testimony].testimonyText}</p>
                    </div>
                    <div className="small-12 columns text-center">
                      <div className={styles.testimonyContainer}>
                        <div className={styles.testimonyPerson}>
                          <img className={styles.testimonyPicture} src={this.state.testimonyList[this.state.testimony].testimonyPicture} alt="xendit.com" />
                          <div className={styles.testimonyCred}>
                            <h4 className={styles.testimonyName}>{this.state.testimonyList[this.state.testimony].testimonyName}</h4>
                            <h5 className={styles.testimonyPosition}>{this.state.testimonyList[this.state.testimony].testimonyPosition}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="small-12 columns text-center">
                      <button className={styles.circle} disabled={this.state.testimony === 0} onClick={() => this.setPage(0)} />
                      <button className={styles.circle} disabled={this.state.testimony === 1} onClick={() => this.setPage(1)} />
                      <button className={styles.circle} disabled={this.state.testimony === 2} onClick={() => this.setPage(2)} />
                      <button className={styles.circle} disabled={this.state.testimony === 3} onClick={() => this.setPage(3)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
  };
}

export default connect(null, mapDispatchToProps)(HomePage);
