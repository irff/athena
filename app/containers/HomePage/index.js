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

  goLogin() {
    console.log("plob");
  }

  render() {
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
