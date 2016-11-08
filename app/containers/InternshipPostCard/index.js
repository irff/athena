/*
 *
 * InternshipPostCard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { fromJS, Map } from 'immutable';

import { displayApply } from 'containers/ApplyInternship/actions';

import TokopediaImg from 'containers/HomePage/tokopedia.png';

export class InternshipPostCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    displayApply: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: Map({
        detailed: false,
        item: {
          id: 'wololo',
          role: 'Software Engineer Intern',
          company: 'Bukalapak',
          companyDescription: 'Bukalapak adalah company terkeren sedunia. Dengan intern di Bukalapak, kamu bisa dapat gaji yang besar, makan gratis, fasilitas gratis, dan kehidupan yang amat sangat layak. Ada gym-nya pula. Yuk, intern di Bukalapak!',
          industry: 'E-Commerce',
          address: 'Kemang, Jakarta Selatan',
          mapLink: 'http://maps.google.com',
          website: 'www.bukalapak.com',
          salary: 4000000,
          currency: 'IDR',
          term: 'bulan',
          requirement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus tempus mi et rutrum:\n- plebplob\n- beepboop',
          responsibility: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac mi ut neque pharetra aliquam. Etiam maximus tempus mi et rutrum:\n- plebplob\n- beepboop',
          experience: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac mi ut neque pharetra aliquam. Etiam maximus tempus mi et rutrum:\n- plebplob\n- beepboop',
          cp: {
            id: 'wulala',
            name: 'Illuvatar Samatarian',
            role: 'Chief of Pleb',
            phone: '+62 123 456 7890',
            email: 'illuvatar@bukalapak.com',
          },
          timestamp: '2016-11-03T06:46:45.562Z'
        },
      }),
    };

    this.toggleDetailed = this.toggleDetailed.bind(this);
    this.applyIntern = this.applyIntern.bind(this);
  }

  toggleDetailed() {
    this.setState(({data}) => ({
      data: data.update('detailed', detailed => !detailed)
    }));
    console.log(this.state.data.get('detailed'));
  }

  applyIntern() {
    console.log('bleh');
    this.props.displayApply(fromJS(this.state.data));
  }  

  render() {
    const data = this.state.data;
    let timePassed = new Date() - Date.parse(data.get('item').timestamp);
    timePassed /= 1000;
    timePassed /= 60;
    const minute = Math.floor(timePassed % 60);
    timePassed /= 60;
    const hours = Math.floor(timePassed % 24);
    timePassed /= 24;
    const days = Math.floor(timePassed % 7);
    timePassed /= 7;
    const weeks = Math.floor(timePassed);

    const timestamp = `${weeks >= 1 ? `${weeks}mi`:`${days >= 1 ? `${days}h` : `${hours >= 1 ? `${hours}j` : `${minute}m`}`}`}`;

    const unDetailed = (
        <div className={styles.internshipPostCard}>
          <div className="row expanded">
            <div className="small-12 columns">
              <div className={styles.snipet}>
                <div className="row expanded">
                  <div className="small-2 columns">
                    <img className={styles.postLogo} src={TokopediaImg} alt="logo perusahaan" />
                  </div>
                  <div className="small-10 columns">
                    <div className={styles.postContent}>
                      <h3>{data.get('item').role}</h3>
                      <h4>{data.get('item').company}</h4>
                      <h5><a href={data.get('item').mapLink}>{data.get('item').address}</a></h5>
                      <h5>{data.get('item').currency}. {Math.round((data.get('item').salary/100000)) / 10} Juta/{data.get('item').term}</h5>
                      <h6>{timestamp}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="small-6 columns">
              <button className={styles.detailButton} onClick={this.toggleDetailed} >Lihat Detail Internship</button>
            </div>
            <div className="small-6 columns">
              <button className={styles.applyButton} onClick={this.applyIntern}>Daftar Internship</button>
            </div>
          </div>
        </div>
      );

    const detailed = (
        <div className={styles.internshipPostCard}>
          <div className="row expanded">
            <div className="small-12 columns">
              <div className={styles.header}>
                <div className="row expanded">
                  <div className="small-1 columns">
                    <img className={styles.postLogo} src={TokopediaImg} alt="logo perusahaan" />   
                  </div>
                  <div className="small-8 columns">
                    <div className={styles.postContent}>
                      <h3>{data.get('item').company}</h3>
                      <h4>{data.get('item').industry} Company</h4>
                      <h5><a href={data.get('item').mapLink}>{data.get('item').address}</a></h5>
                      <h5><a href={`http://${data.get('item').website}`}>{data.get('item').website}</a></h5>
                      <p>{data.get('item').companyDescription}</p>
                    </div>
                  </div>
                  <div className="small-3 columns">
                    <div className={styles.postContact}>
                      <p>Contact person:</p>
                      <h3>{data.get('item').cp.name}</h3>
                      <h4>{data.get('item').cp.role}</h4>
                      <h5>{data.get('item').cp.phone}</h5>
                      <h5>{data.get('item').cp.email}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="small-12 columns">
              <div className={styles.snipet}>
                <div className={styles.postDetail}>
                  <div className="row expanded">
                    <div className="small-12 columns">
                      <h1>{data.get('item').role}</h1>
                      <h2>{data.get('item').address}</h2>
                      <h2>{data.get('item').currency}. {Math.round((data.get('item').salary/100000)) / 10} Juta/{data.get('item').term}</h2>
                    </div>
                    <div className="small-4 columns">
                      <h3>Kemampuan Teknis</h3>
                      <p>{data.get('item').requirement}</p>
                    </div>
                    <div className="small-4 columns">
                      <h3>Tanggung Jawab / Pekerjaan</h3>
                      <p>{data.get('item').responsibility}</p>
                    </div>
                    <div className="small-4 columns">
                      <h3>Pengalaman yang Didapat</h3>
                      <p>{data.get('item').experience}</p>
                    </div>
                  </div>
                  <h6>{timestamp}</h6>
                </div>
              </div>
            </div>
            <div className="small-6 columns">
              <button className={styles.detailButton} onClick={this.toggleDetailed} >Tutup</button>
            </div>
            <div className="small-6 columns">
              <button className={styles.applyButton} onClick={this.applyIntern}>Daftar Internship</button>
            </div>
          </div>
        </div>
      );

    const content = data.get('detailed') ? detailed : unDetailed; 
    const grid = data.get('detailed') ? "small-12 columns" : "small-6 columns end";

    return (
      <div className={grid}>
        {content}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    displayApply: (payload) => dispatch(displayApply(payload)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(InternshipPostCard);
