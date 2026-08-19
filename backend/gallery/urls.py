from django.urls import path
from .views import (
    site_settings_view, hero_section_view, specialties_view,
    stats_view, featured_work_view, testimonials_view, instagram_view,
    cta_section_view, enquiry_create_view, faq_view, studio_view, process_view,
    footer_view
)

urlpatterns = [
    path('site-settings/', site_settings_view, name='site-settings'),
    path('hero/', hero_section_view, name='hero-section'),
    path('specialties/', specialties_view, name='specialties'),
    path('stats/', stats_view, name='stats'),
    path('featured-work/', featured_work_view, name='featured-work'),
    path('testimonials/', testimonials_view, name='testimonials'),
    path('instagram/', instagram_view, name='instagram'),
    path('cta/', cta_section_view, name='cta-section'),
    path('enquire/', enquiry_create_view, name='enquire'),
    path('faq/', faq_view, name='faq'),
    path('studio/', studio_view, name='studio'),
    path('process/', process_view, name='process'),
    path('footer/', footer_view, name='footer'),
]