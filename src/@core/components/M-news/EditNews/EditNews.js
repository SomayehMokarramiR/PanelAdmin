import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import http from "../../../interceptor";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";

const EditNews = () => {
  const [dataNews, setDataNews] = useState();
  const { id } = useParams();
  console.log(id);
  const getNewsDetail = async () => {
    const result = await http.get(`/News/${id}`);
    console.log("result", result);
    return result;
  };
  const { data: detaDetailNews, status } = useQuery(
    ["getNewsDetail", id],
    getNewsDetail
  );
  console.log(detaDetailNews)

  const [initialValues, setInitialValues] = useState({
    Title: "",
    Describe: "",
    MiniDescribe: "",
    GoogleDescribe: "",
    GoogleTitle: "",
    Image: "",
    Keyword: "",
    IsSlider: "",
    NewsCatregoryId: 1,
  });

  useEffect(() => {
    if (status === "success") {
      setInitialValues({
        id: detaDetailNews?.detailsNewsDto.id,
        Title: detaDetailNews?.detailsNewsDto.title,
        MiniDescribe: detaDetailNews?.detailsNewsDto.miniDescribe,
        Describe: detaDetailNews?.detailsNewsDto.describe,
        GoogleDescribe: detaDetailNews?.detailsNewsDto.googleDescribe,
        GoogleTitle:detaDetailNews?.detailsNewsDto.googleTitle,
        Keyword: detaDetailNews?.detailsNewsDto.keyword,
        IsSlider: detaDetailNews?.detailsNewsDto.IsSlider,
        Image: detaDetailNews?.detailsNewsDto.currentImageAddress,
      });
    }
  }, [status]);
  console.log(initialValues);


  const onSubmit = async (param) => {
    const formData = new FormData();
    console.log(param);
    const setNews = {
      Title: param.Title,
      Describe: param.Describe,
      MiniDescribe: param.MiniDescribe,
      GoogleTitle: param.Title + "" + param.Title,
      GoogleDescribe:
        param.MiniDescribe + "" + param.MiniDescribe + "" + param.MiniDescribe,
      Keyword: param.Keyword,
      IsSlider: param.IsSlider,
      NewsCatregoryId: 1,
      Image: param.Image,
    };
    const keys = Object.keys(setNews);
    keys.forEach((key) => {
      const item = setNews[key];
      formData.append(key, item);
      console.log(formData);
    });
    const result = await http.put(`/News/UpdateNews`, formData);
    console.log(result);
    result?.success === true
      ? toast.success(result.message)
      : toast.error(result.message);
    return result;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>ویرایش خبر</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            // validationSchema={validation}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="Title">
                      عنوان خبر
                    </Label>
                    <Input
                      type="text"
                      name="Title"
                      id="Title"
                      placeholder="عنوان خبر"
                      value={values.Title}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="GoogleTitle">
                      عنوان گوگل
                    </Label>
                    <Input
                      type="text"
                      name="GoogleTitle"
                      id="GoogleTitle"
                      placeholder="عنوان گوگل"
                      value={values.GoogleTitle}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="GoogleDescribe">
                      توضیحات گوگل
                    </Label>
                    <Input
                      type="text"
                      name="GoogleDescribe"
                      id="GoogleDescribe"
                      placeholder=" توضیحات گوگل"
                      value={values.GoogleDescribe}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="MiniDescribe">
                      شرح کوتاه
                    </Label>
                    <Input
                      type="textarea"
                      name="MiniDescribe"
                      id="MiniDescribe"
                      placeholder=" توضیح مختصر"
                      value={values.MiniDescribe}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="Describe">
                      شرح کامل
                    </Label>
                    <Input
                      type="textarea"
                      name="Describe"
                      id="Describe"
                      placeholder=" توضیح کامل"
                      value={values.Describe}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <Label className="form-label" for="Keyword">
                      کلمات کلیدی
                    </Label>
                    <Input
                      type="text"
                      name="Keyword"
                      id="Keyword"
                      placeholder="کلمات کلیدی"
                      value={values.Keyword}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col
                    sm="12"
                    className="d-flex align-items-center justify-content-around my-2"
                  >
                    <div className="form-check">
                      <Input
                        type="checkbox"
                        name="IsSlider"
                        id="IsSlider"
                        // defaultChecked={true}
                        value={values.IsSlider}
                        onChange={(e) =>
                          setFieldValue("IsSlider", e.target.checked)
                        }
                      />
                      <Label className="form-check-label" for="IsSlider">
                        نمایش در اسلایدر
                      </Label>
                    </div>
                    <div className="form-check d-flex">
                      <Label className="form-check-label" for="img">
                        درج عکس
                      </Label>
                      <Input
                        name="Image"
                        type="file"
                        id="img"
                        //   value={values.Image}
                        onChange={(e) => {
                          setFieldValue("Image", e.target.files[0]);
                        }}
                      />
                    </div>
                  </Col>
                  <Col sm="12" className=" mb-1">
                    <div className="d-flex mt-2">
                      <Button className="me-1" color="primary" type="submit">
                        ویرایش
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditNews;
