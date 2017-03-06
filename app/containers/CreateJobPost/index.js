/*
 *
 * CreateJobPost
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import selectCreateJobPost from './selectors';
import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import CompanyHeader from 'components/CompanyHeader';
import AlertSuccess from 'components/AlertSuccess';
import Modal from 'components/Modal';
import Cleave from 'cleave.js/react';
import { has, xor } from 'lodash';
import { submit, review, cancelReview, inputChange } from './actions';
import { loading } from 'containers/App/actions';
import { selectGlobal } from 'containers/App/selectors';
import { fetchUserData } from 'containers/UserAccess/actions';

export class CreateJobPost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    local: React.PropTypes.object,
    global: React.PropTypes.object,
    inputChange: React.PropTypes.func,
    review: React.PropTypes.func,
    cancelReview: React.PropTypes.func,
    submit: React.PropTypes.func,
    push: React.PropTypes.func,
    loading: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
  };

  componentDidMount() {
    const token = this.getCookie('token');
    const companyId = this.getCookie('company_id');

    if (this.props.global.token === '' || this.props.global.id === '') {
      this.props.loading();
      if (token !== '' && companyId !== '') {
        this.props.fetchUserData({ token, id: companyId, isCompany: true });
      } else {
        this.props.push('/perusahaan/login');
      }
    }
  }

  getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  renderErrorMessage = (field, label) => {
    const { validationErrors } = this.props.local;
    if (has(validationErrors, field)) {
      return <ErrorMessage>{`${label} ${validationErrors[field][0]}`}</ErrorMessage>;
    }

    return null;
  }

  renderEditing() {
    const { role, salary, location, technical_requirements, tasks, experiences_gained, status, job_schedule, category } = this.props.local;

    const categoryMap = {
      DESIGN: 'Design',
      ENGINEERING: 'Engineering',
    };

    const statusMap = {
      PHONE_INTERVIEW: 'Phone Interview',
      ONLINE_TEST: 'Online Test',
      TASK_SUBMISSION: 'Task Submission',
      ONSITE_INTERVIEW: 'On-Site Interview',
    };

    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const periods = Array.from(Array(12).keys()).map(n => {
      const raw = n + month;
      const mo = raw % 12;
      const yr = year + (raw > 12);
      return [`1-${mo}-${yr}`, `${months[mo]} ${yr}`];
    });

    const termMap = {
      hari: 'Hari',
      minggu: 'Minggu',
      bulan: 'Bulan',
    };

    return (
      <div>
        <div className="row">
          <div className="small-12 columns">
            <div className="input">
              <span>Nama Posisi Intern</span>
              <Input
                fullWidth
                placeholder="Tuliskan nama posisi intern baru disini"
                value={role}
                onChange={e => this.props.inputChange('role', e.target.value)}
              />
            </div>
            {this.renderErrorMessage('role', 'Nama Posisi')}
            <div className="input">
              <span>Kategori Posisi</span>
              <Select
                width="14rem"
                onChange={e => this.props.inputChange('category', e.target.value)}
                value={category}
              >
                <option value="" disabled>Pilih Kategori Posisi ini</option>
                {Object.keys(categoryMap).map((k, idx) =>
                  <option key={idx} value={k}>{categoryMap[k]}</option>
                )}
              </Select>
            </div>
            {this.renderErrorMessage('category', 'Kategori Posisi')}
            <div className="input">
              <span>Lokasi Internship</span>
              <Input
                width="18.75rem"
                placeholder="Tuliskan lokasi untuk posisi ini disini"
                value={location}
                onChange={e => this.props.inputChange('location', e.target.value)}
              />
            </div>
            {this.renderErrorMessage('location', 'Lokasi')}
            <div className="input">
              <span>Periode Internship</span>
              <Select
                width="14rem"
                onChange={e => this.props.inputChange('job_schedule.start_at', e.target.value)}
                value={job_schedule.start_at}
              >
                <option value="" disabled>Pilih Bulan Mulai</option>
                {periods.map((p, idx) =>
                  <option key={idx} value={p[0]}>{p[1]}</option>
                )}
              </Select>
              <Between>-</Between>
              <Select
                width="14rem"
                onChange={e => this.props.inputChange('job_schedule.end_at', e.target.value)}
                value={job_schedule.end_at}
              >
                <option value="" disabled>Pilih Bulan Selesai</option>
                {periods.map((p, idx) =>
                  <option key={idx} value={p[0]}>{p[1]}</option>
                )}
              </Select>
            </div>
            {this.renderErrorMessage('job_schedule', 'Periode Internship')}
            <div className="input">
              <span>Gaji</span>
              <MultiLine>
                <div>
                  <StyledCleave
                    width="9.25rem"
                    options={{
                      prefix: 'IDR ',
                      numeral: true,
                      numeralThousandsGroupStyle: 'thousand',
                    }}
                    value={salary.fee.minimal}
                    onChange={e => this.props.inputChange('salary.fee.minimal', parseInt(e.target.rawValue.substring(4), 10))}
                  />
                  <Between>-</Between>
                  <StyledCleave
                    width="9.25rem"
                    options={{
                      prefix: 'IDR ',
                      numeral: true,
                      numeralThousandsGroupStyle: 'thousand',
                    }}
                    value={salary.fee.maximal}
                    onChange={e => this.props.inputChange('salary.fee.maximal', parseInt(e.target.rawValue.substring(4), 10))}
                  />
                  <Between>/</Between>
                  <Select
                    width="9.25rem"
                    value={salary.term}
                    onChange={e => this.props.inputChange('salary.term', e.target.value)}
                  >
                    <option value="" disabled>Pilih periode</option>
                    {Object.keys(termMap).map((k, idx) =>
                      <option key={idx} value={k}>{termMap[k]}</option>
                    )}
                  </Select>
                </div>
                <div>
                  <label htmlFor="hideSalary" onClick={() => this.props.inputChange('salary.isHidden', !salary.isHidden)}>
                    <input
                      type="checkbox"
                      name="hideSalary"
                      checked={salary.isHidden}
                    />
                    Sembunyikan gaji dari profil perusahaan saya
                  </label>
                  <div className="hideSalaryInfo">
                    Apabila gaji disembunyikan, tim Quint akan menjaga kerahasiaan informasi gaji
                    tersebut dan data akan hanya digunakan untuk keperluan blabla.
                  </div>
                </div>
              </MultiLine>
            </div>
            {this.renderErrorMessage('salary', 'Gaji')}
          </div>
        </div>

        <Line />

        <div className="row">
          <div className="small-12 columns">
            <div className="input multiline">
              <span>Kemampuan Teknis <em>(Requirements)</em></span>
              <span className="subhead">Tuliskan kemampuan teknis yang harus dimiliki untuk posisi ini. Pisahkan dengan enter / baris baru.</span>
              <textarea
                placeholder="Tuliskan per-poin disini"
                value={technical_requirements.join('\n')}
                onChange={e => this.props.inputChange('technical_requirements', e.target.value.split('\n'))}
              />
            </div>
            {this.renderErrorMessage('technical_requirements', 'Requirements')}

            <div className="input multiline">
              <span>Tanggung Jawab <em>(Job Description)</em></span>
              <span className="subhead">Tuliskan pekerjaan yang akan dilakukan oleh posisi ini. Pisahkan dengan enter / baris baru.</span>
              <textarea
                placeholder="Tuliskan per-poin disini"
                value={tasks.join('\n')}
                onChange={e => this.props.inputChange('tasks', e.target.value.split('\n'))}
              />
            </div>
            {this.renderErrorMessage('tasks', 'Tanggung Jawab')}

            <div className="input multiline">
              <span>Pengalaman yang Didapat</span>
              <span className="subhead">Tuliskan pengalaman yang didapat setelah intern di posisi ini. Pisahkan dengan enter / baris baru.</span>
              <textarea
                placeholder="Tuliskan per-poin disini"
                value={experiences_gained.join('\n')}
                onChange={e => this.props.inputChange('experiences_gained', e.target.value.split('\n'))}
              />
            </div>
            {this.renderErrorMessage('experiences_gained', 'Pengalaman')}
          </div>
        </div>

        <Line />

        <div className="row">
          <div className="small-12 columns">
            <div className="input multiline">
              <span>Status Proses Rekrutmen</span>
              <span className="subhead has-margin">Silahkan <em>checklist</em> tahap-tahap rekrutmen untuk posisi ini</span>
              {Object.keys(statusMap).map((k, idx) =>
                <label
                  htmlFor={`status[${idx}]`}
                  key={idx}
                  onClick={() => this.props.inputChange('status', xor(status, [k]))}
                >
                  <input
                    type="checkbox"
                    name={`status[${idx}]`}
                    checked={status.findIndex(e => e === k) >= 0}
                  />
                  {statusMap[k]}
                </label>
              )}
            </div>
            {this.renderErrorMessage('status', 'Status')}
          </div>
        </div>

        <Line />


        <div className="row">
          <div className="small-12 columns">
            <BlueButton className="submit" onClick={this.props.review}>Simpan</BlueButton>
          </div>
        </div>
      </div>
    );
  }

  renderReviewing() {
    const { role, salary, location, technical_requirements, tasks, experiences_gained, isSubmitting, isSubmitted } = this.props.local;

    return (
      <ReviewContainer>
        <div className="row">
          <div className="small-12 columns">
            <section>
              <Role>{role}</Role>
            </section>
            <section>
              <span className="location">{location}</span>
              <span>{`${salary.currency} ${salary.fee.minimal}-${salary.fee.maximal} /${salary.term}`}</span>
            </section>
            <section>
              <div className="row">
                <div className="medium-4 columns">
                  <h3>Technical Requirements</h3>
                  <ul>
                    {technical_requirements.map((item, idx) =>
                      <li key={idx}>{item}</li>
                    )}
                  </ul>
                </div>
                <div className="medium-4 columns">
                  <h3>Responsibilities / Jobs</h3>
                  <ul>
                    {tasks.map((item, idx) =>
                      <li key={idx}>{item}</li>
                    )}
                  </ul>
                </div>
                <div className="medium-4 columns">
                  <h3>Gained Experiences</h3>
                  <ul>
                    {experiences_gained.map((item, idx) =>
                      <li key={idx}>{item}</li>
                    )}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Line />
        <div className="row">
          <ButtonContainer>
            <BlueButton onClick={() => this.props.cancelReview()}>Ubah Kembali</BlueButton>
            <GreenButton onClick={() => this.props.submit()}>{isSubmitting ? 'Memublikasi...' : 'Publikasikan'}</GreenButton>
          </ButtonContainer>
        </div>
        <Modal opened={isSubmitted}>
          <AlertSuccess
            doneText="Kembali ke Dashboard"
            onDoneClick={() => this.props.push('/perusahaan/home')}
          >
            <span>Lowongan internship untuk</span>
            <Role>{role}</Role>
            <strong><em>Cek rutin dashboard untuk melihat pendaftar kedepannya.</em></strong>
          </AlertSuccess>
        </Modal>
      </ReviewContainer>
    );
  }

  render() {
    const { isReviewing } = this.props.local;
    return (
      <div>
        <Helmet
          title="Tambah Posisi Intern"
          meta={[
            { name: 'description', content: 'Tambah Posisi Intern' },
          ]}
        />

        <Navbar />
        <CompanyHeader title={`${isReviewing ? 'Review' : 'Tambah'} Lowongan Posisi Intern`} />
        <ContentWrapper>
          { !isReviewing && this.renderEditing() }
          { isReviewing && this.renderReviewing() }
        </ContentWrapper>

        <Footer hasMargin />
      </div>

    );
  }
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 40rem) {
    flex-direction: row;
    justify-content: flex-end;

    button {
      margin-left: 2rem;
    }

  }

`;

const ReviewContainer = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.black};
  font-weight: 400;

  .location {
    margin-right: 2.25rem;
  }

  section {
    margin-bottom: 1.4rem;
  }

  h3 {
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

const Role = styled.h1`
  font-size: 1.25rem;
  color: ${props => props.theme.black};
  font-weight: 700;
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.red};
`;

const BlueButton = styled.button`
  background: ${props => props.theme.lightBlue};
  color: ${props => props.theme.white};
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.75rem 3.5rem;
  border-radius: 3.5rem;
  float: right;
  margin-top: 2.4rem;
`;

const GreenButton = styled(BlueButton)`
  background: ${props => props.theme.green};
`;

const StyledCleave = styled(Cleave)`
  flex: ${props => (props.fullWidth ? 1 : 0)};
  ${props => props.width && `max-width: ${props.width};`}

  @media screen and (min-width: 40rem) {
    ${props => props.width && `min-width: ${props.width};`}
  }
`;

const Line = styled.div`
  height: .1rem;
  border: solid .1rem #cccccc;
  margin-top: 2.4rem;
`;

const ContentWrapper = styled.div`
  padding: 4.25rem;
  padding-top: 2.85rem;

  .input {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    margin-top: 1.4rem;

    &:not(.multiline) {
      @media screen and (min-width: 40rem) {
        flex-direction: row;
        align-items: center;
        line-height: 1;

        & > span {
          width: 15rem;
        }
      }
    }

    & > span, .header > span {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1;
      color: ${props => props.theme.black};

      & > em {
        font-weight: normal;
      }
    }

    span.subhead {
      font-weight: normal;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      margin-bottom: 0.6875rem;
    }

    input, select, textarea {
      border-radius: 0.15rem;
      box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      border: solid 0.1rem ${props => props.theme.gray};
      padding: 0.625rem;
    }

    textarea {
      min-height: 6rem;
    }
  }

  input[type="radio"] {
    margin-right: 1.3rem;
  }

  .hideSalaryInfo {
    margin-left: 2.5rem;
    color: ${props => props.theme.gray};
    margin-bottom: 0;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${props => props.theme.black};
    font-size: 1.125rem;
    margin-bottom: 0.625rem;


    & > input[type="checkbox"] {
      margin-right: 1.5rem;
      height: 1rem;
      width: 1rem;
      background: ${props => props.theme.white};
      box-shadow: 0;
    }
  }

  span.subhead.has-margin {
    margin-bottom: 1.8125rem;
  }
`;

const Between = styled.span`
  color: ${props => props.black};
  font-size: 1.25rem;
  margin-left: 0.875rem;
  margin-right: 0.875rem;
  flex: 0;
`;

const MultiLine = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 1.4rem;
  }
`;

const Input = styled.input`
  flex: ${props => (props.fullWidth ? 1 : 0)};
  ${props => props.width && `max-width: ${props.width};`}

  @media screen and (min-width: 40rem) {
    ${props => props.width && `min-width: ${props.width};`}
  }
`;

const Select = styled.select`
  flex: ${props => (props.fullWidth ? 1 : 0)};
  ${props => props.width && `max-width: ${props.width};`}

  @media screen and (min-width: 40rem) {
    ${props => props.width && `min-width: ${props.width};`}
  }
`;

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  local: selectCreateJobPost(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    inputChange: (label, value) => dispatch(inputChange(label, value)),
    review: () => dispatch(review()),
    cancelReview: () => dispatch(cancelReview()),
    submit: () => dispatch(submit()),
    push: (url) => dispatch(push(url)),
    loading: () => dispatch(loading()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPost);
