/*
 *
 * InternshipPostCard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import globalStyles from 'containers/App/styles.css';
import styles from './styles.css';
import { isEmpty } from 'lodash';
import { displayApply } from 'containers/ApplyInternship/actions';

import JapanBackground from './japan.jpg';

import styled from 'styled-components';

const StudentDashboardCard = styled.div`
  width: ${(props) => {
    if (props.detailed) {
      return '100%';
    }

    return 'calc(50% - 0.5rem)';
  }};
  height: auto;
  background: #FCFCFC;
  color: ${(props) => props.theme.black};
  box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.19);
  padding: 0;
  margin: 0 0 1rem;

  @media screen and (max-width: 64em) {
    width: 100%;
  }

  .cardContent {
    padding: 0;
    height: 100%;

    .unDetailed {
      display: ${(props) => {
        if (props.detailed) {
          return 'none';
        }

        return 'flex';
      }};
      height: 100%;
      margin: 0;
      padding: 0;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: stretch;

      .toggleButton {
        align-self: flex-end;
        width: 100%;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.7rem;
        font-weight: 700;
        line-height: 1;
        margin: 0;
        text-align: center;
        color: ${(props) => props.theme.lightBlack};
        background: ${(props) => props.theme.yellow};

        &:disabled {
          opacity: 0.35;
        }
      }

      .innerContent {
        width: 100%;
        height: auto;
        padding: 1.5rem 2rem 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;

        .companyLogo {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          object-position: center;
        }

        .companyData {
          flex: 1;
          padding: 0 1rem;

          a {
            color: ${(props) => props.theme.black};
            text-decoration: underline;
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            line-height: 1;
            margin: 0;
          }

          h1 {
            font-size: 1.2rem;
            margin-bottom: 0.1rem;
          }

          h2 {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          h3, h4 {
            font-size: 0.75rem;
            margin-bottom: 0.5rem;
          }

          h5 {
            display: inline-block;
            font-size: 0.7rem;
          }

          strong {
            font-weight: 700;
          }

          .status {
            display: inline-block;
            padding: 0.2rem 0.5rem 0.15rem;
            margin-right: 0.5rem;
            font-size: 0.7rem;
            font-weight: 700;
            border-radius: 0.2rem;
            color: ${(props) => props.theme.white};
            background: ${(props) => {
              if (props.status === 1) {
                return props.theme.green;
              } else if (props.status === 2) {
                return props.theme.red;
              }

              return props.theme.blue;
            }};
          }
        }
      }
    }

    .detailed {
      display: ${(props) => {
        if (props.detailed) {
          return 'flex';
        }

        return 'none';
      }};
      height: 100%;
      margin: 0;
      padding: 0;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: stretch;

      .toggleButton {
        align-self: flex-end;
        width: 100%;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
        line-height: 1;
        margin: 0;
        text-align: center;
        color: ${(props) => props.theme.lightBlack};
        background: ${(props) => props.theme.lightGray};
      }

      .innerContent {
        width: 100%;
        height: auto;
        padding: 1.5rem 2rem 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;

        .companyLogo {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          object-position: center;
        }

        .companyData {
          flex: 1;
          padding: 0 1rem;

          a {
            color: ${(props) => props.theme.black};
            text-decoration: underline;
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            line-height: 1;
            margin: 0;
          }

          h1 {
            font-size: 1.2rem;
            margin-bottom: 0.25rem;
          }

          h2,
          h3,
          h4 {
            margin-bottom: 0.5rem;
            margin-right: 2rem;
            display: inline-block;
          }

          h2 {
            font-size: 1rem;
            font-weight: 700;
          }

          h3, h4 {
            font-size: 0.8rem;
          }

          h5 {
            display: inline-block;
            font-size: 0.7rem;
          }

          strong {
            font-weight: 700;
          }

          .status {
            display: inline-block;
            padding: 0.2rem 0.5rem 0.15rem;
            margin-right: 0.5rem;
            font-size: 0.7rem;
            font-weight: 700;
            border-radius: 0.2rem;
            color: ${(props) => props.theme.white};
            background: ${(props) => {
              if (props.status === 1) {
                return props.theme.green;
              } else if (props.status === 2) {
                return props.theme.red;
              }

              return props.theme.blue;
            }};
          }
        }
      }

      .tips {
        width: 100%;
        padding: 2rem 0 1rem;

        h1,
        h2,
        h3 {
          line-height: 1;
          margin: 0;
        }

        h1 {
          font-size: 1rem;
        }

        h2 {
          font-size: 1rem;
          color: ${(props) => props.theme.darkGray};
          margin-top: 1rem;
          font-weight: 700;
        }

        h3 {
          font-size: 1rem;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: stretch;

          span {
            padding-top: 0.1rem;
            font-size: 0.75rem;
            margin-right: 0.5rem;
          }

          a {
            flex: 1;
            color: ${(props) => props.theme.black};
            font-size: 1rem;
            display: inline-block;
            font-weight: 700;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        strong {
          font-weight: 700;
        }
      }
    }
  }
`;

export class InternshipPostCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    displayApply: React.PropTypes.func,
    item: React.PropTypes.object,
    validation: React.PropTypes.array,
    dashboardCard: React.PropTypes.bool,
    index: React.PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      detailed: false,
    };

    this.toggleDetailed = this.toggleDetailed.bind(this);
    this.applyIntern = this.applyIntern.bind(this);
  }

  toggleDetailed() {
    this.setState({
      detailed: !this.state.detailed,
    });
  }

  applyIntern() {
    this.props.displayApply(this.props.item);
  }

  render() {
    const { item } = this.props;
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    let timePassed = null;
    let minute = null;
    let hours = null;
    let days = null;
    let weeks = null;
    let timestamp = null;
    let startDur = null;
    let endDur = null;
    let finalDur = null;
    let minSalary = null;
    let maxSalary = null;
    let salary = null;
    let validation = null;
    let validationItem = null;
    let location = null;
    let city = null;
    let region = null;
    let street = null;
    let address = null;
    let unDetailed = null;
    let detailed = null;
    let content = null;
    let grid = null;
    let status = null;
    let updateDate = null;
    let studyListLeftContent = null;
    let studyListRightContent = null;
    let studyListInnerContent = null;

    let finalContent = (<div>nodata</div>);

    if (!this.props.dashboardCard) {
      // Student-Side Find Internship Card
      timePassed = new Date() - Date.parse(item.created_at);

      timePassed /= 1000;
      timePassed /= 60;
      minute = Math.floor(timePassed % 60);

      timePassed /= 60;
      hours = Math.floor(timePassed % 24);

      timePassed /= 24;
      days = Math.floor(timePassed % 7);

      timePassed /= 7;
      weeks = Math.floor(timePassed);

      timestamp = `${weeks >= 1 ? `${weeks}w` : `${days >= 1 ? `${days}d` : `${hours >= 1 ? `${hours}h` : `${minute}m`}`}`}`;

      startDur = new Date(item.job_schedule.start_at);

      endDur = new Date(item.job_schedule.end_at);

      finalDur = `${monthNames[startDur.getMonth()]} ${startDur.getFullYear()} - ${monthNames[endDur.getMonth()]} ${endDur.getFullYear()}`;

      minSalary = (Math.round(item.salary.fee.minimal / 100000) / 10) >= 1 ? `${Math.round(item.salary.fee.minimal / 100000) / 10} Juta` : `${(Math.round(item.salary.fee.minimal / 100) / 10)} Ribu`;

      maxSalary = (Math.round(item.salary.fee.maximal / 100000) / 10) >= 1 ? `${Math.round(item.salary.fee.maximal / 100000) / 10} Juta` : `${(Math.round(item.salary.fee.maximal / 100) / 10)} Ribu`;

      salary = `${item.salary.currency} ${minSalary} - ${maxSalary}/${item.salary.term}`;

      if (item.salary.fee.minimal === item.salary.fee.maximal) {
        salary = `${item.salary.currency} ${minSalary}/${item.salary.term}`;

        if ((item.salary.fee.minimal === 0 || item.salary.fee.minimal === null || item.salary.fee.minimal === '') && (item.salary.fee.maximal === 0 || item.salary.fee.maximal === null || item.salary.fee.maximal === '')) {
          salary = 'Tidak Dipublikasikan';
        }
      } else if ((item.salary.fee.minimal > 0 && item.salary.fee.minimal !== null && item.salary.fee.minimal !== '') && (item.salary.fee.maximal === 0 || item.salary.fee.maximal === null || item.salary.fee.maximal === '')) {
        salary = `${item.salary.currency} ${minSalary}/${item.salary.term}`;
      } else if ((item.salary.fee.maximal > 0 && item.salary.fee.maximal !== null && item.salary.fee.maximal !== '') && (item.salary.fee.minimal === 0 || item.salary.fee.minimal === null || item.salary.fee.minimal === '')) {
        salary = `${item.salary.currency} ${maxSalary}/${item.salary.term}`;
      }

      validation = false;
      validationItem = this.props.validation ? this.props.validation : [];

      if (validationItem.indexOf(item.id) > -1) {
        validation = true;
      }

      location = item.location.split(/[\s,]+/);
      city = location.pop();
      region = location.pop();
      street = location.pop();
      address = `${street}, ${region}, ${city}`;

      unDetailed = (
        <div className={styles.internshipPostCard}>
          <div className="row expanded">
            <div className="small-12 columns">
              <div className={styles.snipetSmall}>
                <div className="row expanded">
                  <div className="small-2 columns">
                    <img className={styles.postLogo} src={item.company.logo_url} alt="logo perusahaan" />
                  </div>
                  <div className="small-10 columns">
                    <div className={styles.postContent}>
                      <h3>{item.role}</h3>
                      <h4>{item.company.name}</h4>
                      <h5><a href={`https://www.google.com/maps/search/${item.location}`} target="_blank">{address}</a></h5>
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

      detailed = (
        <div className={styles.internshipPostCard}>
          <div className="row expanded">
            <div className="small-12 columns">
              <div className={styles.container}>
                <div className={styles.bgImg}><img src={item.company.background_img_url === 'iniDefaultEntryQuint' || isEmpty(item.company.background_img_url) ? JapanBackground : item.company.background_img_url} alt="cover background" /></div>
                <div className={styles.header}>
                  <div className="row expanded">
                    <div className="small-12 medium-1 columns">
                      <img className={styles.postLogo} src={item.company.logo_url} alt="logo perusahaan" />
                    </div>
                    <div className="small-12 medium-11 columns">
                      <div className={styles.postContent}>
                        <h3>{item.company.name}</h3>
                        <h4>{item.company.category} Company</h4>
                        <h5><a href={`https://www.google.com/maps/search/${item.location}`} target="_blank">{address}</a></h5>
                        <h5><a href={item.company.website.startsWith('http') ? item.company.website : `http://${item.company.website}`}>{item.company.website}</a></h5>
                        <p>{item.why_us}</p>
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
                      <h1>{item.role}</h1>
                      <h2>{salary}</h2>
                      <h2>{finalDur}</h2>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Kemampuan Teknis</h3>
                      <div className={styles.listContainer}>
                        <ul>
                          {item.technical_requirements.map((value, index) => (<li key={index}>{value}</li>))}
                        </ul>
                      </div>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Tanggung Jawab / Pekerjaan</h3>
                      <div className={styles.listContainer}>
                        <ul>
                          {item.tasks.map((value, index) => (<li key={index}>{value}</li>))}
                        </ul>
                      </div>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <h3>Pengalaman yang Didapat</h3>
                      <div className={styles.listContainer}>
                        <ul>
                          {item.experiences_gained.map((value, index) => (<li key={index}>{value}</li>))}
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

      content = this.state.detailed ? detailed : unDetailed;
      grid = this.state.detailed ? 'small-12 columns' : 'small-12 medium-6 columns end';

      finalContent = (
        <div className={grid}>
          {content}
        </div>
      );
    } else {
      // Student-Side Dashboard Card
      status = 0;

      if (item.status.toLowerCase() === 'diterima') {
        status = 1;
      } else if (item.status.toLowerCase() === 'ditolak') {
        status = 2;
      }

      location = item.job_detail.company.company_address.split(/[\s,]+/);
      city = location.pop();
      region = location.pop();
      address = `${region}, ${city}`;

      minSalary = (Math.round(item.salary.fee.minimal / 100000) / 10) >= 1 ? `${Math.round(item.salary.fee.minimal / 100000) / 10} Juta` : `${(Math.round(item.salary.fee.minimal / 100) / 10)} Ribu`;

      maxSalary = (Math.round(item.salary.fee.maximal / 100000) / 10) >= 1 ? `${Math.round(item.salary.fee.maximal / 100000) / 10} Juta` : `${(Math.round(item.salary.fee.maximal / 100) / 10)} Ribu`;

      salary = `${item.salary.currency} ${minSalary} - ${maxSalary}/${item.salary.term}`;

      if (item.salary.fee.minimal === item.salary.fee.maximal) {
        salary = `${item.salary.currency} ${minSalary}/${item.salary.term}`;

        if ((item.salary.fee.minimal === 0 || item.salary.fee.minimal === null || item.salary.fee.minimal === '') && (item.salary.fee.maximal === 0 || item.salary.fee.maximal === null || item.salary.fee.maximal === '')) {
          salary = 'Tidak Dipublikasikan';
        }
      } else if ((item.salary.fee.minimal > 0 && item.salary.fee.minimal !== null && item.salary.fee.minimal !== '') && (item.salary.fee.maximal === 0 || item.salary.fee.maximal === null || item.salary.fee.maximal === '')) {
        salary = `${item.salary.currency} ${minSalary}/${item.salary.term}`;
      } else if ((item.salary.fee.maximal > 0 && item.salary.fee.maximal !== null && item.salary.fee.maximal !== '') && (item.salary.fee.minimal === 0 || item.salary.fee.minimal === null || item.salary.fee.minimal === '')) {
        salary = `${item.salary.currency} ${maxSalary}/${item.salary.term}`;
      }

      updateDate = new Date(item.updated_at);

      studyListLeftContent = [];
      studyListRightContent = [];

      if (!isEmpty(item.job_detail)) {
        item.job_detail.study_references.map((studyItem, studyIndex) => {
          studyListInnerContent = studyItem.contents.map((studyContentsItem, studyContentsIndex) => (
            <h3 key={`study-reference-link-item-${this.props.index}-study-${studyIndex}-content-${studyContentsIndex}`}><span className={globalStyles.iconlink} /><a href={studyContentsItem.ref_url} target="_blank">{studyContentsItem.title}</a></h3>
          ));

          if (studyIndex % 2 === 0) {
            studyListLeftContent.push((
              <div key={`study-reference-link-item-${this.props.index}-study-${studyIndex}`} className="small-12 columns">
                <h2>Topik: {studyItem.name}</h2>
                {studyListInnerContent}
              </div>
            ));
          } else {
            studyListRightContent.push((
              <div key={`study-reference-link-item-${this.props.index}-study-${studyIndex}`} className="small-12 columns">
                <h2>Topik: {studyItem.name}</h2>
                {studyListInnerContent}
              </div>
            ));
          }

          return '';
        });
      }

      content = (
        <div className="cardContent">
          <div className="unDetailed">
            <div className="innerContent">
              <img className="companyLogo" src={item.job_detail.company.logo_url} alt={`q-company-logo-${item.job_detail.company.name}`} />
              <div className="companyData">
                <h1>{item.job_detail.role}</h1>
                <h2>{item.job_detail.company.name}</h2>
                <h3><a href={`https://www.google.com/maps/search/${item.job_detail.company.company_address}`} target="_blank">{address}</a></h3>
                <h4>{salary}</h4>
                <div className="status">{item.status}</div>
                <h5>Diperbaharui <strong>{updateDate.getDate()}-{updateDate.getMonth() + 1}-{updateDate.getFullYear()}, {updateDate.toLocaleString('id', { hour: 'numeric', minute: 'numeric', hour12: true })}</strong></h5>
              </div>
            </div>
            <button className="toggleButton" onClick={this.toggleDetailed} disabled={status !== 0}>Topik Yang Harus Dipelajari</button>
          </div>
          <div className="detailed">
            <div className="innerContent">
              <img className="companyLogo" src={item.job_detail.company.logo_url} alt={`q-company-logo-${item.job_detail.company.name}`} />
              <div className="companyData">
                <h1>{item.job_detail.role}</h1>
                <h2>{item.job_detail.company.name}</h2>
                <h3><a href={`https://www.google.com/maps/search/${item.job_detail.company.company_address}`} target="_blank">{address}</a></h3>
                <h4>{salary}</h4>
                <br />
                <div className="status">{item.status}</div>
                <h5>Diperbaharui <strong>{updateDate.getDate()}-{updateDate.getMonth() + 1}-{updateDate.getFullYear()}, {updateDate.toLocaleString('id', { hour: 'numeric', minute: 'numeric', hour12: true })}</strong></h5>
              </div>
              <div className="tips">
                <div className="row expanded">
                  <div className="small-12 columns">
                    <h1>Berikut adalah <strong>topik-topik yang kamu harus dipelajari untuk mempersiapkan kualifikasi</strong> Anda selanjutnya</h1>
                  </div>
                  <div className="small-12 large-6 columns">
                    <div className="row">
                      {studyListLeftContent}
                    </div>
                  </div>
                  <div className="small-12 large-6 columns">
                    <div className="row">
                      {studyListRightContent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="toggleButton" onClick={this.toggleDetailed}>Tutup</button>
          </div>
        </div>
      );

      finalContent = (
        <StudentDashboardCard detailed={this.state.detailed} status={status}>
          {content}
        </StudentDashboardCard>
      );
    }

    return finalContent;
  }
}


function mapDispatchToProps(dispatch) {
  return {
    displayApply: (payload) => dispatch(displayApply(payload)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(InternshipPostCard);
