from rest_framework import serializers
from .models import (
    SiteSettings, HeroSection, SpecialtiesSection, SpecialtyItem,
    StatItem, FeaturedWorkSection, FeaturedShoot,
    TestimonialsSection, Testimonial, InstagramSection, InstagramImage,
    CTASection, Enquiry, FAQSection, FAQItem,
    StudioSection, ProcessSection, ProcessStep, FooterSection
)
class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ['site_name', 'phone_number', 'whatsapp_number', 'whatsapp_message', 'email']


class HeroSectionSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            'title', 'subtitle', 'background_image',
            'primary_button_text', 'primary_button_link',
            'secondary_button_text', 'secondary_button_link',
        ]

    def get_background_image(self, obj):
        return obj.background_image.url if obj.background_image else None


class SpecialtiesSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialtiesSection
        fields = ['eyebrow_text', 'heading']


class SpecialtyItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SpecialtyItem
        fields = ['id', 'label', 'image', 'order']

    def get_image(self, obj):
        return obj.image.url if obj.image else None    

class StatItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatItem
        fields = ['id', 'value', 'suffix', 'label', 'order']    

class FeaturedWorkSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedWorkSection
        fields = ['eyebrow_text', 'heading', 'subtext']


class FeaturedShootSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = FeaturedShoot
        fields = ['id', 'tag', 'title', 'story', 'image', 'order']

    def get_image(self, obj):
        return obj.image.url if obj.image else None        

class StudioSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = StudioSection
        fields = ['eyebrow_text', 'name', 'role', 'bio_paragraph_1', 'bio_paragraph_2', 'quote', 'image']

    def get_image(self, obj):
        return obj.image.url if obj.image else None


class ProcessSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessSection
        fields = ['eyebrow_text', 'heading']


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ['id', 'number', 'title', 'description', 'order']

class TestimonialsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialsSection
        fields = ['eyebrow_text', 'heading']


class TestimonialSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'shoot', 'quote', 'avatar', 'rating', 'order']

    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else None    


class InstagramSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramSection
        fields = ['heading', 'handle', 'profile_url']


class InstagramImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = InstagramImage
        fields = ['id', 'image', 'alt_text', 'order']

    def get_image(self, obj):
        return obj.image.url if obj.image else None    

class CTASectionSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = CTASection
        fields = ['eyebrow_text', 'heading', 'subtext', 'background_image', 'footer_note']

    def get_background_image(self, obj):
        return obj.background_image.url if obj.background_image else None


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['email']    

class FAQSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQSection
        fields = ['eyebrow_text', 'heading', 'subtext']


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ['id', 'question', 'answer', 'order']        


class FooterSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSection
        fields = ['tagline']        