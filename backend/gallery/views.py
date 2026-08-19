from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    SiteSettings, HeroSection, SpecialtiesSection, SpecialtyItem,
    StatItem, FeaturedWorkSection, FeaturedShoot,
    TestimonialsSection, Testimonial, InstagramSection, InstagramImage,
    CTASection, Enquiry, FAQSection, FAQItem,
    StudioSection, ProcessSection, ProcessStep, FooterSection
)
from .serializers import StudioSectionSerializer, ProcessStepSerializer
from .serializers import FAQItemSerializer
from .serializers import CTASectionSerializer, EnquirySerializer
from .serializers import InstagramImageSerializer
from .serializers import TestimonialSerializer
from .serializers import FeaturedShootSerializer
from .serializers import StatItemSerializer
from .serializers import SpecialtyItemSerializer
from .serializers import SiteSettingsSerializer, HeroSectionSerializer


@api_view(['GET'])
def site_settings_view(request):
    obj = SiteSettings.load()
    return Response(SiteSettingsSerializer(obj).data)


@api_view(['GET'])
def hero_section_view(request):
    obj = HeroSection.load()
    return Response(HeroSectionSerializer(obj).data)


@api_view(['GET'])
def specialties_view(request):
    section = SpecialtiesSection.load()
    items = SpecialtyItem.objects.all()
    return Response({
        'eyebrow_text': section.eyebrow_text,
        'heading': section.heading,
        'items': SpecialtyItemSerializer(items, many=True).data,
    })

@api_view(['GET'])
def stats_view(request):
    items = StatItem.objects.all()
    return Response(StatItemSerializer(items, many=True).data)

@api_view(['GET'])
def featured_work_view(request):
    section = FeaturedWorkSection.load()
    items = FeaturedShoot.objects.all()
    return Response({
        'eyebrow_text': section.eyebrow_text,
        'heading': section.heading,
        'subtext': section.subtext,
        'items': FeaturedShootSerializer(items, many=True).data,
    })
@api_view(['GET'])
def studio_view(request):
    obj = StudioSection.load()
    return Response(StudioSectionSerializer(obj).data)


@api_view(['GET'])
def process_view(request):
    section = ProcessSection.load()
    steps = ProcessStep.objects.all()
    return Response({
        'eyebrow_text': section.eyebrow_text,
        'heading': section.heading,
        'steps': ProcessStepSerializer(steps, many=True).data,
    })

@api_view(['GET'])
def testimonials_view(request):
    section = TestimonialsSection.load()
    items = Testimonial.objects.all()
    return Response({
        'eyebrow_text': section.eyebrow_text,
        'heading': section.heading,
        'items': TestimonialSerializer(items, many=True).data,
    })

@api_view(['GET'])
def instagram_view(request):
    section = InstagramSection.load()
    items = InstagramImage.objects.all()
    return Response({
        'heading': section.heading,
        'handle': section.handle,
        'profile_url': section.profile_url,
        'items': InstagramImageSerializer(items, many=True).data,
    })

@api_view(['GET'])
def cta_section_view(request):
    obj = CTASection.load()
    return Response(CTASectionSerializer(obj).data)


@api_view(['POST'])
def enquiry_create_view(request):
    serializer = EnquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def faq_view(request):
    section = FAQSection.load()
    items = FAQItem.objects.all()
    return Response({
        'eyebrow_text': section.eyebrow_text,
        'heading': section.heading,
        'subtext': section.subtext,
        'items': FAQItemSerializer(items, many=True).data,
    })

@api_view(['GET'])
def footer_view(request):
    footer = FooterSection.load()
    site = SiteSettings.load()
    instagram = InstagramSection.load()
    return Response({
        'tagline': footer.tagline,
        'site_name': site.site_name,
        'email': site.email,
        'phone_number': site.phone_number,
        'instagram_url': instagram.profile_url,
    })