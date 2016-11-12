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
import { fromJS } from 'immutable';

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
  };

  constructor(props) {
    super(props);

    const userData = this.props.global.get('userData');
    const panelData = this.props.local;

    this.state = {
      data: fromJS({
        first_name: userData.get('first_name'),
        last_name: userData.get('last_name'),
        headline:  userData.get('headline'),
        major:  userData.get('major'),
        university: userData.get('university'),
        experiences: {
          achievement_num: userData.getIn(['experiences', 'achievement_num']),
          project_num: userData.getIn(['experiences', 'project_num']),
          work_num: userData.getIn(['experiences', 'work_num']),
        },
        linkedin_url: userData.get('linkedin_url'),
        resume_url: userData.get('resume_url'),
      }),
    };
  }

/*  componentDidMount() {
    document.addEventListener('click', this.props.hideApply);
  }

  componentWillUnmount() {
    document.removeEventListener("click",this.props.hideApply);
  } */

  render() {
    const profile = this.props.global.get('userData');
    const visibility = this.props.local.visibility ? 'block' : 'none';
    const job = isEmpty(this.props.local.job) ? fromJS({}) : fromJS(this.props.local.job.item);
    const valid = this.state.data.get('headline') === 'iniDefaultEntryQuint' || this.state.data.get('major') === 'iniDefaultEntryQuint' || this.state.data.get('university') === 'iniDefaultEntryQuint' || this.state.data.get('resume_url') === 'http://iniDefaultEntryQui.nt';

    return (
      <div className={styles.applyInternship} style={{display: visibility}}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className="row expanded">
              <div className="small-12 columns">
                <div className={styles.header}><p>Review Profile Anda</p><h1>{job.get('role')} at {job.getIn(['company', 'name'])}</h1></div>
              </div>
              <div className="small-12 columns">
                <div className={styles.container}>
                  <div className={styles.profile}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <h1>{this.state.data.get('first_name')} {this.state.data.get('last_name')}</h1> 
                      </div>
                      <div className="small-12 columns">
                        <h2>{this.state.data.get('headline') === 'iniDefaultEntryQuint' ? '' : this.state.data.get('headline')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jurusan / Universitas</p>
                        <h2>{this.state.data.get('major') === 'iniDefaultEntryQuint' ? '' : this.state.data.get('major')}, {this.state.data.get('university') === 'iniDefaultEntryQuint' ? '' : this.state.data.get('university')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Profil Selanjutnya</p>
                        <h2><a href={this.state.data.get('resume_url') === 'http://iniDefaultEntryQui.nt' ? '' : this.state.data.get('resume_url')}>Resume</a> • <a href={this.state.data.get('linkedin_url')}>LinkedIn</a></h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Prestasi</p>
                        <h2>{this.state.data.getIn(['experiences','achievement_num'])}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Proyek</p>
                        <h2>{this.state.data.getIn(['experiences','project_num'])}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Organisasi / Kepanitiaan</p>
                        <h2>{this.state.data.getIn(['experiences','work_num'])}</h2> 
                      </div>
                    </div>
                    <button onClick={() => this.props.push('/mahasiswa/ubah-profil')}>Edit Profil</button>
                    <div className={styles.overlay} style={{display: false ? 'block' : 'none'}}>
                      <div className={styles.container}>
                        <div className={styles.centralize}>
                          <h4>Ooop, profil anda ternyata belum lengkap, silahkan lengkapi profil anda dahulu</h4>
                          <button onClick={() => this.props.push('/mahasiswa/ubah-profil')}>disini</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="small-12 medium-6 columns">
              <button className={styles.detailButton} onClick={this.props.hideApply}>Kembali</button>
            </div>
            <div className="small-12 medium-6 columns">
              <button className={styles.applyButton} onClick={this.props.apply}>Daftar Internship</button>
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyInternship);
