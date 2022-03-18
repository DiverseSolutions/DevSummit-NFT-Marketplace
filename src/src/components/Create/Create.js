import React, {useEffect, useState} from 'react'
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { NFTStorage } from 'nft.storage'


export default function Create() {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const [uploadLoadingState, setUploadLoadingState] = useState(false)

  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRFOWFBOUFGZkFkMTk3M2M4NmUxQjNEODA0OTU0OTc5ODYxRjE0NTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzUxMTQzMDY5OSwibmFtZSI6ImRlbW8ifQ.tuQF7fhWdmIUYGjUBCfOhioWcDWedrLIAe8JFWzxQcA'

  async function handleSubmit(){
    if(file == null) return;
    if(name == '') return;
    if(desc == '') return;

    setUploadLoadingState(true)

    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

    const metadata = await client.store({
      name: name,
      description: desc,
      image: file
    })

    setUploadLoadingState(false)

    console.log(metadata)
  }

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {/* Author Profile */}
            <AuthorProfile />
          </div>
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="mt-5 mb-4 intro mt-lg-0 mb-lg-5">
              <div className="intro-content">
                <span>DEV Summit 2022 - NFT Marketplace WorkShop</span>
                <h3 className="mt-3 mb-0">Create NFT</h3>
              </div>
            </div>
            {/* Item Form */}
            <form className="item-form card no-hover" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <div className="flex row">
                <div className="col-12">
                  <div className="relative z-20 cursor-pointer input-group form-group">
                    <div className=" custom-file">
                      <input type="file" onChange={(e) => {
                        if(e.target.files.length > 0){
                          setFile(e.target.files[0])
                        }
                      }} className="cursor-pointer" id="inputGroupFile01" required />
                      <label className="relative z-20 cursor-pointer custom-file-label" htmlFor="inputGroupFile01">{ file == null ? 'Choose Picture' : file.name }</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-3 form-group">
                    <input 
                      onChange={(e) => { 
                        setName(e.target.value)
                      }}
                      value={name}
                      type="text" className="form-control" name="name" placeholder="Item Name" required />
                  </div>
                </div>
                <div className="col-12">
                   <div className="form-group">
                     <textarea 
                       onChange={(e) => {
                         setDesc(e.target.value)
                       }}
                       value={desc}
                       className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} required/>
                   </div>
                 </div>
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="price" placeholder="Item Price" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="royality" placeholder="Royality" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" placeholder="Size" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="copies" placeholder="No of Copies" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12"> */}
                {/*   <div className="mt-3 form-group"> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio1">Put on Sale</label> */}
                {/*     </div> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio2">Instant Sale Price</label> */}
                {/*     </div> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio3">Unlock Purchased</label> */}
                {/*     </div> */}
                {/*   </div> */}
                {/* </div> */}
                <div className="col-12">
                  <button className="mt-3 btn w-100 mt-sm-4" disabled={uploadLoadingState} type="submit">{ uploadLoadingState ? 'Uploading...' : 'Create NFT' }</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

