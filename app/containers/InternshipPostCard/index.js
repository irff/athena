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
import JapanBackground from './japan.jpg';

export class InternshipPostCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    displayApply: React.PropTypes.func,
    item: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: Map({
        detailed: false,
        item: this.props.item ? this.props.item : {}
      }),
    };

    this.toggleDetailed = this.toggleDetailed.bind(this);
    this.applyIntern = this.applyIntern.bind(this);
  }

  toggleDetailed() {
    this.setState(({data}) => ({
      data: data.update('detailed', detailed => !detailed)
    }));
  }

  applyIntern() {
    this.props.displayApply(fromJS(this.state.data));
  }  

  render() {
    const data = this.state.data;
    let timePassed = new Date() - Date.parse(data.get('item').created_at);
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

    let duration = Date.parse(data.get('item').job_schedule.end_at) - Date.parse(data.get('item').job_schedule.start_at); 
    duration /= 1000;
    duration /= 60;
    const minuteDur = Math.floor(duration % 60);
    duration /= 60;
    const hoursDur = Math.floor(duration % 24);
    duration /= 24;
    const daysDur = Math.floor(duration % 7);
    duration /= 7;
    const weeksDur = Math.floor(duration % 4);
    duration = (duration * 7) / 30;
    const monthsDur = Math.floor(duration);

    const finalDur =`${monthsDur >=1 ? `${monthsDur} Bulan` : `${weeksDur >= 1 ? `${weeksDur} Minggu` : `${daysDur >= 1 ? `${daysDur} Hari` : `${hoursDur >= 1 ? `${hoursDur} Jam` : `${minuteDur} Menit`}`}`}`}`;

    let salary = `${data.get('item').salary.currency} ${Math.round(data.get('item').salary.fee.minimal/100000) / 10} Juta - ${Math.round(data.get('item').salary.fee.maximal/100000) / 10} Juta/${data.get('item').salary.term}`;
    if(data.get('item').salary.fee.minimal == data.get('item').salary.fee.maximal) {
      salary = `${data.get('item').salary.currency} ${Math.round(data.get('item').salary.fee.minimal/100000) / 10} Juta/${data.get('item').salary.term}`; 
    }

    const unDetailed = (
        <div className={styles.internshipPostCard}>
          <div className="row expanded">
            <div className="small-12 columns">
              <div className={styles.snipet}>
                <div className="row expanded">
                  <div className="small-2 columns">
                    <img className={styles.postLogo} src={data.get('item').company.logo_url} alt="logo perusahaan" />
                  </div>
                  <div className="small-10 columns">
                    <div className={styles.postContent}>
                      <h3>{data.get('item').role}</h3>
                      <h4>{data.get('item').company.name}</h4>
                      <h5><a href={data.get('item').company.company_address}>{data.get('item').company.company_address}</a></h5>
                      <h5>{salary}</h5>
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
              <div className={styles.container}>
                <div className={styles.bgImg}><img src={data.get('item').company.background_img_url === 'iniDefaultEntryQuint' || data.get('item').company.background_img_url === '' ? JapanBackground : data.get('item').company.background_img_url} alt="cover background" /></div>
                <div className={styles.header}>
                  <div className="row expanded">
                    <div className="small-12 medium-1 columns">
                      <img className={styles.postLogo} src={data.get('item').company.logo_url} alt="logo perusahaan" />   
                    </div>
                    <div className="small-12 medium-8 columns">
                      <div className={styles.postContent}>
                        <h3>{data.get('item').company.name}</h3>
                        <h4>{data.get('item').company.category} Company</h4>
                        <h5><a href={data.get('item').company.company_address}>{data.get('item').company.company_address}</a></h5>
                        <h5><a href={`http://${data.get('item').company.website}`}>{data.get('item').company.website}</a></h5>
                        <p>{data.get('item').why_us}</p>
                      </div>
                    </div>
                    <div className="small-12 medium-3 columns">
                      <div className={styles.postContact}>
                        <p>Contact person:</p>
                        <h3>{data.get('item').contact_person.name}</h3>
                        <h4>{data.get('item').contact_person.role}</h4>
                        <h5>{data.get('item').contact_person.phone}</h5>
                        <h5>{data.get('item').contact_person.email}</h5>
                      </div>
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
                      <h2>{salary}</h2>
                      <h2>{finalDur}</h2>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Kemampuan Teknis</h3>
                      <ul>
                        {data.get('item').technical_requirements.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Tanggung Jawab / Pekerjaan</h3>
                      <ul>
                        {data.get('item').tasks.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Pengalaman yang Didapat</h3>
                      <ul>
                        {data.get('item').skills_gained.map((value, index) => (<li key={index}>{value}</li>))}
                        {data.get('item').experiences_gained.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
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
    const grid = data.get('detailed') ? "small-12 columns" : "small-12 medium-6 columns end";

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
