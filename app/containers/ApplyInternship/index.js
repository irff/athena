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
import { hideApply } from './actions';

import styles from './styles.css';

export class ApplyInternship extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    global: React.PropTypes.object,
    local: React.PropTypes.object,
    hideApply: React.PropTypes.func,
    push: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    const userData = this.props.global.get('userData');
    const panelData = this.props.local;

    this.state = {
      data: fromJS({
        firstName: userData.get('firstName'),
        lastName: userData.get('lastName'),
        headline:  userData.get('headline'),
        major:  userData.get('major'),
        university:  userData.get('university'),
        achievement:  userData.get('achievement'),
        project:  userData.get('project'),
        job:  userData.get('job'),
        linkedIn:  userData.get('linkedIn'),
        resume:  userData.get('resume'),
        valid:  userData.get('valid'),
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

    return (
      <div className={styles.applyInternship} style={{display: visibility}}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className="row expanded">
              <div className="small-12 columns">
                <div className={styles.header}><p>Review Profile Anda</p><h1>{job.get('role')} at {job.get('company')}</h1></div>
              </div>
              <div className="small-12 columns">
                <div className={styles.container}>
                  <div className={styles.profile}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <h1>{this.state.data.get('firstName')} {this.state.data.get('lastName')}</h1> 
                      </div>
                      <div className="small-12 columns">
                        <h2>{this.state.data.get('headline')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jurusan / Universitas</p>
                        <h2>{this.state.data.get('major')}, {this.state.data.get('university')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Profil Selanjutnya</p>
                        <h2><a href={this.state.data.get('resume')}>Resume</a> • <a href={this.state.data.get('linkedIn')}>LinkedIn</a></h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Prestasi</p>
                        <h2>{this.state.data.get('achievement')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Proyek</p>
                        <h2>{this.state.data.get('project')}</h2> 
                      </div>
                      <div className="small-12 columns">
                        <p>Jumlah Organisasi / Kepanitiaan</p>
                        <h2>{this.state.data.get('job')}</h2> 
                      </div>
                    </div>
                    <button onClick={() => this.props.push('/mahasiswa/edit-profil')}>Edit Profil</button>
                    <div className={styles.overlay} style={{display: this.state.data.get('valid') ? 'none' : 'block'}}>
                      <div className={styles.container}>
                        <div className={styles.centralize}>
                          <h4>Ooop, profil anda ternyata belum lengkap, silahkan lengkapi profil anda dahulu</h4>
                          <button onClick={() => this.props.push('/mahasiswa/edit-profil')}>disini</button>
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
              <button className={styles.applyButton}>Daftar Internship</button>
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyInternship);
