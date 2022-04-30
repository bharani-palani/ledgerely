<?php
defined('BASEPATH') or exit('No direct script access allowed');
class cms extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('cms_model');
        $this->load->library('../controllers/auth');
    }
    public function getPages()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data = $this->cms_model->getPages();
            $newData = [];
            for ($i = 0; $i < count($data); $i++) {
                for ($j = 0; $j < count($data[$i]); $j++) {
                    $newData[$i]['page_id'] = $data[$i]['page_id'];
                    $newData[$i]['label'] = $data[$i]['label'];
                    $newData[$i]['href'] = $data[$i]['href'];
                    $newData[$i]['hasAccessTo'] = json_decode(
                        json_encode(explode(',', $data[$i]['hasAccessTo']))
                    );
                }
            }
            $massagedData['response'] = $newData;
            $this->auth->response($massagedData, [], 200);
        }
    }
    public function getConfigPages()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->cms_model->getConfigPages();
            $this->auth->response($data, [], 200);
        }
    }
    public function getConfigPageDetails()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'pageId' => $this->input->post('pageId'),
            ];
            $result = $this->cms_model->getConfigPageDetails($post);
            $object = new stdClass();
            $object->pageId = $result->pageId;
            $object->pageRoute = $result->pageRoute;
            $object->pageLabel = $result->pageLabel;
            $object->pageStatus = $result->pageStatus;
            $object->pageObject = json_decode($result->pageObject);
            $object->pageModifiedBy = $result->pageModifiedBy;
            $object->pageCreatedAt = $result->pageCreatedAt;
            $object->pageUpdatedAt = $result->pageUpdatedAt;
            $object->hasAccessTo = explode(',', $result->hasAccessTo);
            $data['response'] = $object;
            $this->auth->response($data, [], 200);
        }
    }
    public function getPageStatuses()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->cms_model->getPageStatuses();
            $this->auth->response($data, [], 200);
        }
    }
    public function getAccessLevels()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->cms_model->getAccessLevels();
            $this->auth->response($data, [], 200);
        }
    }
    public function deleteAccessLevel()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'accessId' => $this->input->post('accessId'),
            ];
            $data['response'] = $this->cms_model->deleteAccessLevel($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function saveOrUpdateAccessLevel()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'accessId' => $this->input->post('accessId'),
                'accessLabel' => $this->input->post('accessLabel'),
                'accessValue' => $this->input->post('accessValue'),
            ];
            $data['response'] = $this->cms_model->saveOrUpdateAccessLevel(
                $post
            );
            $this->auth->response($data, [], 200);
        }
    }

    public function createPage()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'postData' => $this->input->post('postData'),
            ];
            $data['response'] = $this->cms_model->createPage($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function updatePage()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = $this->input->post('postData');
            $data['response'] = $this->cms_model->updatePage($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function deletePage()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = $this->input->post('deleteData');
            $data['response'] = $this->cms_model->deletePage($post);
            $this->auth->response($data, [], 200);
        }
    }
}
