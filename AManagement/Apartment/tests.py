from webbrowser import get

from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from rest_framework.authtoken.models import Token
from .models import Letters, User, People
from .views import LettersViewSet, InfoPeopleViewSet


class InfoPeopleViewSetTest(TestCase):

    def test_get_people(self):

        people = People.objects.filter(sex__icontains="Nữ")

        self.assertTrue(people.exists())

        self.assertEqual(people.count(), 1)


class LettersViewSetTest(TestCase):
    def setUp(self):

        # Tạo token cho người dùng
        self.client = APIClient()
        self.client.force_authenticate(user=4)

    def test_get_letters(self):
        # Gửi yêu cầu GET đến API
        response = self.client.get('/letter/')

        # Kiểm tra status code
        self.assertEqual(response.status_code, 200)

        # Kiểm tra số lượng phản ánh trả về
        self.assertEqual(len(response.data), 2)

        # Kiểm tra nội dung của phản ánh
        self.assertEqual(response.data[0]['content'], 'Complaint 1')

