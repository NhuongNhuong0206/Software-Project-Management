from .models import *
from rest_framework import serializers


class CarCardSerializers(serializers.ModelSerializer):
    class Meta:
        model = CarCard
        # filter chỉ định các trường serialize ra pare thành json để gửi ra bên ngoài để client gọi API
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)  # Băm mật khẩu trước khi lưu
        u.save()
        return u

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['avatar_acount'] = instance.avatar_acount.url if instance.avatar_acount else None
        return rep

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'avatar_acount', 'change_password_required', 'email']


class BillSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bill
        # filter chỉ định các trường serialize ra pare thành json để gửi ra bên ngoài để client gọi API
        fields = ['id', 'name_bill', 'money', 'decription', 'type_bill', 'status_bill', 'user_resident', 'created_date',
                  'updated_date', ]


class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        # filter chỉ định các trường serialize ra pare thành json để gửi ra bên ngoài để client gọi API
        fields = ['id', 'username', ]


#         extra_kwargs = {# các trường chí ghi chớ không đọc
#                 'pass_acount': {
#                     'write_only': 'True'
#                 },
#                 'admin': {
#                     'write_only': 'True'
#                 }
#         }

class UpdateResidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password', 'avatar_acount', ]
        extra_kwargs = {
            'pass_acount': {
                'write_only': True
            }
        }


class BoxSerializers(serializers.ModelSerializer):
    class Meta:
        model = Box
        # filter chỉ định các trường serialize ra pare thành json để gửi ra bên ngoài để client gọi API
        fields = ['id', 'stand', 'describe', 'box_status', ]


class GoodsSerializers(serializers.ModelSerializer):
    img_goods = serializers.SerializerMethodField()

    def get_img_goods(self, obj):
        if obj.img_goods:
            return obj.img_goods.url
        return None

    class Meta:
        model = Goods
        fields = ['id', 'name_goods', 'received_Goods', 'note', 'box', 'size', 'img_goods', 'created_date']


class LettersSerializers(serializers.ModelSerializer):
    user_admin = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, many=True)

    class Meta:
        model = Letters
        fields = ['title_letter', 'content', 'img_letter', 'user_admin', 'people', 'created_date']


class ForgotPasswordSerializers(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = People
        fields = ['name_people', 'email', 'identification_card']


class PeopleSerializers(serializers.ModelSerializer):
    class Meta:
        model = People
        # filter chỉ định các trường serialize ra pare thành json để gửi ra bên ngoài để client gọi API
        fields = ['name_people', 'birthday', 'sex', 'phone', 'expiry', 'expiry', 'ApartNum', 'identification_card', ]


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class SurveyResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
