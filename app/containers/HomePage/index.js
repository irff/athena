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
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import globalStyles from 'containers/App/styles.css';

import SpaciousMp from './Spacious.mp4';
import SpaciousWebm from './Spacious.webm';

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

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.state = {
      testimony: 0,
    };
  }

  goLogin() {
    console.log("plob");
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
    const testimonyList = [
      {
        'testimonyText':'An adaptable and responsible graduate seeking an entry-level position in public relations which will utilise the organisational and communication skills developed through my involvement with Kent Rag and promotional work during vacations.',
        'testimonyName':'Gabe Newell Bellevue',
        'testimonyPosition':'CEO of Valve Software Ltd.'
      },
      {
        'testimonyText':'An adaptable and responsible graduate seeking an entry-level position in public relations which will utilise the organisational and communication skills developed through my involvement with Kent Rag and promotional work during vacations.',
        'testimonyName':'Son Goku',
        'testimonyPosition':'CEO of Pleb Software Ltd.'
      },
      {
        'testimonyText':'An adaptable and responsible graduate seeking an entry-level position in public relations which will utilise the organisational and communication skills developed through my involvement with Kent Rag and promotional work during vacations.',
        'testimonyName':'Vallfard Samatarian',
        'testimonyPosition':'CEO of Pl0b Software Ltd.'
      },
      {
        'testimonyText':'An adaptable and responsible graduate seeking an entry-level position in public relations which will utilise the organisational and communication skills developed through my involvement with Kent Rag and promotional work during vacations.',
        'testimonyName':'Ernest Blofeld',
        'testimonyPosition':'CEO of Plab Software Ltd.'
      },
    ];
    return (
      <div>
        <div className="row expanded">
          <div className="small-12 columns">
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
        	          <div className={styles.centralize}>
                      <Logo className={styles.logo} />
        	            <h1 className={styles.tagline}>Quality Internship for Talented Students,<br />Top Universities, and Qualified Companies.</h1>
                      <Button className={styles.blackButton} handleRoute={this.goLogin} >coba sekarang</Button>
        	          </div>
        		    	</div>
        		    </div>
            	</div>
          	</div>
          </div>
          <div className="small-12 columns">
            <div className={styles.content}>
              <div className={styles.secondPanel}>
                <h1>Quint adalah internship <em>match making platform</em> berbasis web yang akan menyelesaikan permasalahan terkait internship yang dihadapi oleh mahasiswa, universitas, dan perusahaan.</h1>
              </div>
              <div className={styles.thirdPanel}>
                <div className={styles.contentContainer}>
                  <div className="row expanded">
                    <div className="small-12 columns text-center">
                      <h3>Perusahaan yang Mempercayai Quint</h3>
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={BlibliImg} alt="Blibli.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={TokopediaImg} alt="Tokopedia.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={VeritransImg} alt="veritrans.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={DekorumaImg} alt="dekoruma.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={CermatiImg} alt="cermati.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={YesbossImg} alt="yesboss.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={RumaImg} alt="ruma.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={IndivaraImg} alt="indivara.com" />
                    </div>
                    <div className="small-12 medium-4 columns text-center">
                      <img src={DmsumImg} alt="dmsum.com" />
                    </div>
                    <div className="small-12 medium-4 medium-offset-4 columns text-center end">
                      <img src={XenditImg} alt="xendit.com" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.fourthPanel}>
                <div className={styles.testimonyContentContainer}>
                  <button className={styles.prevButton} onClick={() => this.prev(this.state.testimony)} ><span className={globalStyles.iconleftarrow}></span></button>
                  <button className={styles.nextButton} onClick={() => this.next(this.state.testimony)} ><span className={globalStyles.iconrightarrow}></span></button>
                  <div className="row expanded">
                    <div className="small-12 columns text-center">
                      <h3>Testimoni</h3>
                    </div>
                    <div className="small-12 columns text-center">
                      <p className={styles.testimonyText}>{testimonyList[this.state.testimony].testimonyText}</p>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <img className={styles.testimonyPicture} src={TokopediaImg} alt="xendit.com" />
                    </div>
                    <div className="small-12 medium-8 columns">
                      <h4 className={styles.testimonyName}>{testimonyList[this.state.testimony].testimonyName}</h4>
                      <h5 className={styles.testimonyPosition}>{testimonyList[this.state.testimony].testimonyPosition}</h5>
                    </div>
                    <div className="small-12 columns">
                      <div className={styles.testimonyDivider} />
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