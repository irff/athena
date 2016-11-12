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
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';

import SpaciousMp from './Spacious.mp4';
import SpaciousWebm from './Spacious.webm';
import SpaciousJPG from './Spacious.jpg';

import Logo from 'components/Logo';
import Button from 'components/Button';
import Footer from 'components/Footer';

import BlibliImg from './blibli.png';
import TokopediaImg from './tokopedia.png';
import VeritransImg from './veritrans.png';
import DekorumaImg from './dekoruma.png';
import CermatiImg from './cermati.png';
import YesbossImg from './yesboss.png';
import RumaImg from './ruma.png';
import IndivaraImg from './indivara.jpg';
import DmsumImg from './dmsum.jpg';
import XenditImg from './xendit.jpg';

import ArunaHarsa from './aru.png';
import MosesLo from './moses.png';
import RakhaKanz from './rakha.png';
import VictorArdianto from './victor.png';

import CheckedImg from './checked.png';
import SearchImg from './search.png';
import TeamImg from './team.png';
import WorkImg from './worker.png';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      testimony: 0,
      testimonyList: [
        {
          'testimonyText':"We used Quint to source top-notch quality of engineering internship, and the result was awesome. We were able to match with interns that are not only were great culture fit, but also built several core products, making huge impact towards our business. Their quality are definitely beyond any other platforms we've used before",
          'testimonyName':'Aruna Harsa',
          'testimonyPosition':'Co-Founder, CTO of Dekoruma',
          'testimonyPicture': ArunaHarsa,
        },
        {
          'testimonyText':"I think we have a few from Quint that are going through the process. It's filled up the pipeline which I appreciate",
          'testimonyName':'Moses Lo',
          'testimonyPosition':'Co-Founder, CTO of Xendit',
          'testimonyPicture': MosesLo,
        },
        {
          'testimonyText':"Proses yang sangat cepat - hanya butuh 4 hari untuk saya dari submit resume sampai diterima di perusahaan yang saya inginkan. Tanpa Quint, saya rasa saya tidak akan melakukan internship di liburan kali ini. Terima kasih",
          'testimonyName':'Rakha Kanz Kautsar',
          'testimonyPosition':'Software Engineer Intern of Dekoruma',
          'testimonyPicture': RakhaKanz,
        },
        {
          'testimonyText':'Saya pernah menggunakan aplikasi internship match-making lain, namun karena alurnya tidak mudah, saya tidak lanjut menggunakan. Kemudian salah seorang teman saya merekomendasikan Quint. Setelah saya coba ternyata Quint lebih mudah dipakai, dan dalam waktu yang singkat saya langsung mendapatkan tempat internship yang saya inginkan.',
          'testimonyName':'Victor Ardianto',
          'testimonyPosition':'Quality Engineer Intern of HappyFresh',
          'testimonyPicture': VictorArdianto,
        },
      ],
    };
  }

  next(currentPage) {
    const nextPage = currentPage >= 3 ? 0 : currentPage + 1;
    this.setState({'testimony':nextPage});
  }

  prev(currentPage) {
    const prevPage = currentPage == 0 ? 3 : currentPage - 1;
    this.setState({'testimony':prevPage});
  }

  setPage(targetPage) {
    this.setState({'testimony':targetPage});
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
                      <h1 className={styles.principle}>Quint adalah <i>internship match making platform</i> berbasis web yang akan menyelesaikan permasalahan terkait <i>internship</i> yang dihadapi oleh mahasiswa, universitas, dan perusahaan.</h1>
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
                      <h1 className={styles.principle}>Quint adalah <i>internship match making platform</i> berbasis web yang akan menyelesaikan permasalahan terkait <i>internship</i> yang dihadapi oleh mahasiswa, universitas, dan perusahaan.</h1>
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
                      <h3>Cari Internship Lebih Mudah</h3>
                      <h4>Penasaran mengetahui progess lamaran internship anda di perusahaan? Dengan Quint, anda akan terus mendapatkan update untuk mengetahui status seleksi anda.</h4>
                    </div>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Mahasiswa</h2>
                      <img src={WorkImg} alt="searchIcon" />
                      <h3>Cari Internship Lebih Mudah</h3>
                      <h4>Bingung mempersiapkan apa yang perlu dipelajari untuk tes/wawancara? Quint menyediakan materi dan sumber terbaik dalam satu tempat untuk persiapan terbaik anda.</h4>
                    </div>
                  </div>
                  <div className="small-12 medium-3 columns text-center">
                    <div className={styles.advantage}>
                      <h2>Perusahaan</h2>
                      <img src={TeamImg} alt="searchIcon" />
                      <h3>Cari Internship Lebih Mudah</h3>
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
                      <img src={VeritransImg} alt="veritrans.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={DekorumaImg} alt="dekoruma.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={CermatiImg} alt="cermati.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={YesbossImg} alt="yesboss.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={RumaImg} alt="ruma.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 columns text-center">
                      <img src={IndivaraImg} alt="indivara.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 medium-offset-3 large-offset-0 columns text-center">
                      <img src={DmsumImg} alt="dmsum.com" />
                    </div>
                    <div className="small-6 medium-3 large-4 large-offset-4 columns text-center end">
                      <img src={XenditImg} alt="xendit.com" />
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
                      <button className={styles.circle} disabled={this.state.testimony == 0} onClick={() => this.setPage(0)} />
                      <button className={styles.circle} disabled={this.state.testimony == 1} onClick={() => this.setPage(1)}  />
                      <button className={styles.circle} disabled={this.state.testimony == 2} onClick={() => this.setPage(2)}  />
                      <button className={styles.circle} disabled={this.state.testimony == 3} onClick={() => this.setPage(3)}  />
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
  };
}

export default connect(null, mapDispatchToProps)(HomePage);