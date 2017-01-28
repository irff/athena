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

import JapanBackground from './japan.jpg';

export class InternshipPostCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    displayApply: React.PropTypes.func,
    item: React.PropTypes.object,
    validation: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: Map({
        detailed: false,
        item: this.props.item ? this.props.item : {},
      }),
    };

    this.toggleDetailed = this.toggleDetailed.bind(this);
    this.applyIntern = this.applyIntern.bind(this);
  }

  toggleDetailed() {
    this.setState(({ data }) => ({
      data: data.update('detailed', detailed => !detailed),
    }));
  }

  applyIntern() {
    this.props.displayApply(fromJS(this.state.data));
  }

  render() {
    const data = this.state.data;
    // const temporaryDeleted = (
    //   <div className="small-12 medium-3 columns">
    //     <div className={styles.postContact}>
    //       <p>Contact person:</p>
    //       <h3>{data.get('item').contact_person.name}</h3>
    //       <h4>{data.get('item').contact_person.role}</h4>
    //       <h5>{data.get('item').contact_person.phone}</h5>
    //       <h5>{data.get('item').contact_person.email}</h5>
    //     </div>
    //   </div>);

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

    const timestamp = `${weeks >= 1 ? `${weeks}w` : `${days >= 1 ? `${days}d` : `${hours >= 1 ? `${hours}h` : `${minute}m`}`}`}`;

    const startDur = new Date(data.get('item').job_schedule.start_at);
    const endDur = new Date(data.get('item').job_schedule.end_at);

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    const finalDur = `${monthNames[startDur.getMonth()]} ${startDur.getFullYear()} - ${monthNames[endDur.getMonth()]} ${endDur.getFullYear()}`;

    const minSalary = (Math.round(data.get('item').salary.fee.minimal / 100000) / 10) >= 1 ? `${Math.round(data.get('item').salary.fee.minimal / 100000) / 10} Juta` : `${(Math.round(data.get('item').salary.fee.minimal / 100) / 10)} Ribu`;

    const maxSalary = (Math.round(data.get('item').salary.fee.maximal / 100000) / 10) >= 1 ? `${Math.round(data.get('item').salary.fee.maximal / 100000) / 10} Juta` : `${(Math.round(data.get('item').salary.fee.maximal / 100) / 10)} Ribu`;

    let salary = `${data.get('item').salary.currency} ${minSalary} - ${maxSalary}/${data.get('item').salary.term}`;
    if (data.get('item').salary.fee.minimal === data.get('item').salary.fee.maximal) {
      salary = `${data.get('item').salary.currency} ${minSalary}/${data.get('item').salary.term}`;

      if ((data.get('item').salary.fee.minimal === 0 || data.get('item').salary.fee.minimal === null || data.get('item').salary.fee.minimal === '') && (data.get('item').salary.fee.maximal === 0 || data.get('item').salary.fee.maximal === null || data.get('item').salary.fee.maximal === '')) {
        salary = 'Tidak Dipublikasikan';
      }
    } else if ((data.get('item').salary.fee.minimal > 0 && data.get('item').salary.fee.minimal !== null && data.get('item').salary.fee.minimal !== '') && (data.get('item').salary.fee.maximal === 0 || data.get('item').salary.fee.maximal === null || data.get('item').salary.fee.maximal === '')) {
      salary = `${data.get('item').salary.currency} ${minSalary}/${data.get('item').salary.term}`;
    } else if ((data.get('item').salary.fee.maximal > 0 && data.get('item').salary.fee.maximal !== null && data.get('item').salary.fee.maximal !== '') && (data.get('item').salary.fee.minimal === 0 || data.get('item').salary.fee.minimal === null || data.get('item').salary.fee.minimal === '')) {
      salary = `${data.get('item').salary.currency} ${maxSalary}/${data.get('item').salary.term}`;
    }

    let validation = false;
    const validationItem = this.props.validation ? this.props.validation : [];

    if (validationItem.indexOf(data.get('item').id) > -1) {
      validation = true;
    }

    const location = data.get('item').company.company_address.split(/[\s,]+/);
    const city = location.pop();
    const region = location.pop();
    const street = location.pop();
    const address = `${street}, ${region}, ${city}`;

    const unDetailed = (
      <div className={styles.internshipPostCard}>
        <div className="row expanded">
          <div className="small-12 columns">
            <div className={styles.snipetSmall}>
              <div className="row expanded">
                <div className="small-2 columns">
                  <img className={styles.postLogo} src={data.get('item').company.logo_url} alt="logo perusahaan" />
                </div>
                <div className="small-10 columns">
                  <div className={styles.postContent}>
                    <h3>{data.get('item').role}</h3>
                    <h4>{data.get('item').company.name}</h4>
                    <h5><a href={`https://www.google.com/maps/search/${data.get('item').company.company_address}`} target="_blank">{address}</a></h5>
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
            <button className={styles.applyButton} onClick={this.applyIntern} disabled={validation}>{validation ? 'Sudah Mendaftar' : 'Daftar Internship'}</button>
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
                  <div className="small-12 medium-11 columns">
                    <div className={styles.postContent}>
                      <h3>{data.get('item').company.name}</h3>
                      <h4>{data.get('item').company.category} Company</h4>
                      <h5><a href={`https://www.google.com/maps/search/${data.get('item').company.company_address}`} target="_blank">{address}</a></h5>
                      <h5><a href={data.get('item').company.website.startsWith('http') ? data.get('item').company.website : `http://${data.get('item').company.website}`}>{data.get('item').company.website}</a></h5>
                      <p>{data.get('item').why_us}</p>
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
                    <div className={styles.listContainer}>
                      <ul>
                        {data.get('item').technical_requirements.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
                    </div>
                  </div>
                  <div className="small-12 medium-4 columns">
                    <h3>Tanggung Jawab / Pekerjaan</h3>
                    <div className={styles.listContainer}>
                      <ul>
                        {data.get('item').tasks.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
                    </div>
                  </div>
                  <div className="small-12 medium-4 columns">
                    <h3>Pengalaman yang Didapat</h3>
                    <div className={styles.listContainer}>
                      <ul>
                        {data.get('item').skills_gained.map((value, index) => (<li key={index}>{value}</li>))}
                        {data.get('item').experiences_gained.map((value, index) => (<li key={index}>{value}</li>))}
                      </ul>
                    </div>
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
            <button className={styles.applyButton} onClick={this.applyIntern} disabled={validation}>Daftar Internship</button>
          </div>
        </div>
      </div>
    );

    const content = data.get('detailed') ? detailed : unDetailed;
    const grid = data.get('detailed') ? 'small-12 columns' : 'small-12 medium-6 columns end';

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
