/*
 *
 * CreateJobPost
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import selectCreateJobPost from './selectors';
import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import CompanyHeader from 'components/CompanyHeader';
import Cleave from 'cleave.js/react';

export class CreateJobPost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Tambah Posisi Intern"
          meta={[
            { name: 'description', content: 'Tambah Posisi Intern' },
          ]}
        />

        <Navbar />
        <CompanyHeader title="Tambah Lowongan Posisi Intern" />
        <ContentWrapper>
          <div className="row">
            <div className="small-12 columns">
              <div className="input">
                <span>Nama Posisi Intern</span>
                <Input fullWidth placeholder="Tuliskan nama posisi intern baru disini" />
              </div>
              <div className="input">
                <span>Kategori Posisi</span>
                <Select width="14rem" placeholder="Pilih kategori posisi ini">
                  <option>Design</option>
                  <option>Design</option>
                  <option>Design</option>
                  <option>Design</option>
                </Select>
              </div>
              <div className="input">
                <span>Lokasi Internship</span>
                <Input width="18.75rem" placeholder="Tuliskan lokasi untuk posisi ini disini" />
              </div>
              <div className="input">
                <span>Periode Internship</span>
                <Select width="14rem">
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                </Select>
                <Between>-</Between>
                <Select width="14rem">
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                  <option>Juni 2017</option>
                </Select>
              </div>
              <div className="input">
                <span>Gaji</span>
                <MultiLine>
                  <div>
                    <input type="radio" name="gaji" checked />
                    <StyledCleave
                      width="9.25rem"
                      options={{
                        prefix: 'IDR ',
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }}
                    />
                    <Between>-</Between>
                    <StyledCleave
                      width="9.25rem"
                      options={{
                        prefix: 'IDR ',
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }}
                    />
                    <Between>/</Between>
                    <Select width="9.25rem">
                      <option>Hari</option>
                      <option>Minggu</option>
                      <option>Bulan</option>
                    </Select>
                  </div>
                  <div>
                    <input type="radio" name="gaji" />
                    <span>Tidak dipublikasikan</span>
                  </div>
                </MultiLine>
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <div className="input multiline">
                <span>Kemampuan Teknis <em>(Requirements)</em></span>
                <span className="subhead">Tuliskan kemampuan teknis yang harus dimiliki untuk posisi ini. Pisahkan dengan enter / baris baru.</span>
                <textarea placeholder="Tuliskan per-poin disini" />
              </div>

              <div className="input multiline">
                <span>Tanggung Jawab <em>(Jobdesk)</em></span>
                <span className="subhead">Tuliskan pekerjaan yang akan dilakukan oleh posisi ini. Pisahkan dengan enter / baris baru.</span>
                <textarea placeholder="Tuliskan per-poin disini" />
              </div>

              <div className="input multiline">
                <span>Pengalaman yang Didapat</span>
                <span className="subhead">Tuliskan pengalaman yang didapat setelah intern di posisi ini. Pisahkan dengan enter / baris baru.</span>
                <textarea placeholder="Tuliskan per-poin disini" />
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <div className="input multiline">
                <span>Status Proses Rekrutmen</span>
                <span className="subhead has-margin">Tuliskan kemampuan teknis yang harus dimiliki untuk posisi ini. Pisahkan dengan enter / baris baru.</span>
                <label htmlFor="status[0]">
                  <input type="checkbox" name="status[]" />
                  Review Resume
                </label>
                <label htmlFor="status[1]">
                  <input type="checkbox" name="status[]" />
                  Phone Interview
                </label>
                <label htmlFor="status[2]">
                  <input type="checkbox" name="status[]" />
                  Online Test
                </label>
                <label htmlFor="status[3]">
                  <input type="checkbox" name="status[]" />
                  Task Submission
                </label>
                <label htmlFor="status[4]">
                  <input type="checkbox" name="status[]" />
                  On-Site Interview
                </label>
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <SubmitButton className="submit">Simpan</SubmitButton>
            </div>
          </div>

        </ContentWrapper>

        <Footer hasMargin />
      </div>
    );
  }
}

const SubmitButton = styled.button`
  background: ${props => props.theme.lightBlue};
  color: ${props => props.theme.white};
  font-weight: 700;
  padding: 0.75rem 3.5rem;
  border-radius: 3.5rem;
  float: right;
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
  margin-bottom: 2.4rem;
`;

const ContentWrapper = styled.div`
  padding: 4.25rem;

  .input {
    display: flex;
    flex-direction: column;
    line-height: 1.25;

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

    margin-bottom: 1.4rem;
  }

  input[type="radio"] {
    margin-right: 1.3rem;
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
      height: 1.5rem;
      width: 1.5rem;
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

const mapStateToProps = selectCreateJobPost();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPost);
