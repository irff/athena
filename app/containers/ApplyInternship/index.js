/*
 *
 * ApplyInternship
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { loading, loadingDone } from 'containers/App/actions';

import { selectGlobal } from 'containers/App/selectors';
import selectApplyInternship from './selectors';
import { hideApply, apply } from './actions';

import styles from './styles.css';

export class ApplyInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: React.PropTypes.object,
    local: React.PropTypes.object,
    hideApply: React.PropTypes.func,
    push: React.PropTypes.func,
    apply: React.PropTypes.func,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
  };

  render() {
    let userData = this.props.global.userData;

    if (isEmpty(this.props.global.userData)) {
      userData = {
        photo_url: '',
        experiences: {
          achievement_num: '',
          project_num: '',
          work_num: '',
        },
        university: '',
        linkedin_url: '',
        headline: '',
        last_name: '',
        major: '',
        first_name: '',
        resume_url: '',
      };
    }

    const visibility = this.props.local.visibility ? 'block' : 'none';
    const job = this.props.local.job;
    const valid = userData.headline === 'iniDefaultEntryQuint' || userData.major === 'iniDefaultEntryQuint' || userData.university === 'iniDefaultEntryQuint' || userData.resume_url === 'http://iniDefaultEntryQui.nt';
    const success = this.props.local.success;
    const fail = this.props.local.fail;

    return (
      <div className={styles.applyInternship} style={{ display: visibility }}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className="row expanded">
              <div className={success ? 'hide' : 'small-12 columns'}>
                <div className={styles.header}><p>Review Profile Anda</p><h1>{job.role} at {job.company.name}</h1></div>
              </div>
              <div className="small-12 columns">
                <div className={styles.container}>
                  <div className={styles.profile}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <h1>{userData.first_name} {userData.last_name}</h1>
                      </div>
                      <div className="small-12 columns">
                        <h2>{userData.headline === 'iniDefaultEntryQuint' ? '' : userData.headline}</h2>
                      </div>
                      <div className="small-12 columns">
                        <p>Jurusan / Universitas</p>
                        <h2>{userData.major === 'iniDefaultEntryQuint' ? '' : userData.major}, {userData.university === 'iniDefaultEntryQuint' ? '' : userData.university}</h2>
                      </div>
                      <div className="small-12 columns">
                        <p>Profil Selanjutnya</p>
                        <h2><a href={userData.resume_url === 'http://iniDefaultEntryQui.nt' ? '' : userData.resume_url}>Resume</a> • <a href={userData.linkedin_url}>LinkedIn</a></h2>
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Prestasi</p>
                        <h2>{userData.experiences.achievement_num}</h2>
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Proyek</p>
                        <h2>{userData.experiences.project_num}</h2>
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Pekerjaan</p>
                        <h2>{userData.experiences.work_num}</h2>
                      </div>
                    </div>
                    <button onClick={() => this.props.push('/mahasiswa/ubah-profil')}>Ubah Profil</button>
                    <div className={styles.overlay} style={{ display: valid ? 'block' : 'none' }}>
                      <div className={styles.container}>
                        <div className={styles.centralize}>
                          <h4>Ooop, profil anda ternyata belum lengkap, silahkan lengkapi profil anda dahulu</h4>
                          <button onClick={() => this.props.push('/mahasiswa/ubah-profil')}>disini</button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.overlayConf} style={{ display: success ? 'block' : 'none' }}>
                      <div className={styles.container}>
                        <div className={styles.centralize}>
                          <h4>Anda telah mendaftar di <b>{job.company.name}</b> sebagai</h4>
                          <h3>{job.role}</h3>
                          <h4>Cek E-Mail anda untuk melihat progress selanjutnya.</h4>
                        </div>
                      </div>
                    </div>
                    <div className={styles.overlayConf} style={{ display: fail ? 'block' : 'none' }}>
                      <div className={styles.container}>
                        <div className={styles.centralize}>
                          <h4>Pendaftaran Gagal</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={success ? 'small-12 columns' : 'small-12 medium-6 columns'}>
                <button className={styles.detailButton} onClick={this.props.hideApply}>Kembali</button>
              </div>
              <div className={success ? 'hide' : 'small-12 medium-6 columns'}>
                <button className={styles.applyButton} onClick={this.props.apply} disabled={valid} >Daftar Internship</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  local: selectApplyInternship(),
});

function mapDispatchToProps(dispatch) {
  return {
    hideApply: () => dispatch(hideApply()),
    push: (url) => dispatch(push(url)),
    apply: () => dispatch(apply()),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyInternship);
